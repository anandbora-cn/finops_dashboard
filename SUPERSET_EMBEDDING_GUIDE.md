# How to Embed Apache Superset Charts

This guide explains how to embed Apache Superset charts into your React dashboard.

## Prerequisites

1. **Running Superset Instance**: You need Apache Superset installed and running
   - Either self-hosted or using Superset Cloud
   - URL example: `http://localhost:8088` or `https://your-superset.company.com`

2. **Created Chart/Dashboard**: You must have already created charts in Superset

## Method 1: Embedding Individual Charts (Recommended)

### Step 1: Enable Embedding in Superset

First, enable the embedding feature in your Superset configuration:

```python
# superset_config.py
FEATURE_FLAGS = {
    "EMBEDDABLE_CHARTS": True,
    "DASHBOARD_NATIVE_FILTERS": True,
}

# Enable CORS if your React app is on a different domain
ENABLE_CORS = True
CORS_OPTIONS = {
    'supports_credentials': True,
    'allow_headers': ['*'],
    'resources': ['*'],
    'origins': ['http://localhost:5173', 'http://localhost:3000']  # Add your React app URLs
}
```

### Step 2: Get the Chart Embed URL

1. Open your chart in Superset
2. Click the "..." menu (three dots) in the top right
3. Select "Embed chart"
4. Copy the embed URL
5. The URL format will be: `http://your-superset-url/superset/explore/?standalone=true&...`

### Step 3: Update Your React Component

Replace `YOUR_SUPERSET_EMBED_URL_HERE` in `Dashboard.jsx` with your actual embed URL:

```jsx
<iframe
  src="http://localhost:8088/superset/explore/?standalone=true&..."
  width="100%"
  height="100%"
  frameBorder="0"
  style={{ border: 'none' }}
  title="Superset Chart"
/>
```

## Method 2: Using Superset Embedded SDK (Advanced)

For better control and authentication, use the official Superset Embedded SDK:

### Step 1: Install the SDK

```bash
npm install @superset-ui/embedded-sdk
```

### Step 2: Create a Superset Component

```jsx
// src/components/SupersetChart.jsx
import React, { useEffect, useRef } from 'react';
import { embedDashboard } from '@superset-ui/embedded-sdk';

export default function SupersetChart({ dashboardId }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      embedDashboard({
        id: dashboardId, // Your dashboard/chart ID from Superset
        supersetDomain: 'http://localhost:8088', // Your Superset URL
        mountPoint: containerRef.current,
        fetchGuestToken: async () => {
          // You need to implement this endpoint on your backend
          const response = await fetch('http://your-backend/api/guest-token');
          const data = await response.json();
          return data.token;
        },
        dashboardUiConfig: {
          hideTitle: true,
          hideChartControls: false,
        },
      });
    }
  }, [dashboardId]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
}
```

### Step 3: Backend Guest Token Generation

You'll need a backend endpoint to generate guest tokens. Here's a Python Flask example:

```python
# backend/app.py
from flask import Flask, jsonify
import requests
import jwt
import datetime

app = Flask(__name__)

SUPERSET_URL = "http://localhost:8088"
SUPERSET_USERNAME = "admin"
SUPERSET_PASSWORD = "admin"

@app.route('/api/guest-token')
def get_guest_token():
    # Login to Superset
    login_response = requests.post(
        f"{SUPERSET_URL}/api/v1/security/login",
        json={
            "username": SUPERSET_USERNAME,
            "password": SUPERSET_PASSWORD,
            "provider": "db"
        }
    )
    access_token = login_response.json()["access_token"]
    
    # Create guest token
    guest_token_response = requests.post(
        f"{SUPERSET_URL}/api/v1/security/guest_token",
        headers={
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json"
        },
        json={
            "user": {
                "username": "guest",
                "first_name": "Guest",
                "last_name": "User"
            },
            "resources": [{
                "type": "dashboard",
                "id": "your-dashboard-id"
            }],
            "rls": []
        }
    )
    
    return jsonify({"token": guest_token_response.json()["token"]})
```

## Method 3: Simple iframe with Public Charts

If your charts are public (no authentication required):

1. Make your chart/dashboard public in Superset
2. Use the standalone URL directly in your iframe
3. Add `?standalone=true` to hide Superset's navigation

```jsx
<iframe
  src="http://localhost:8088/superset/dashboard/1/?standalone=true"
  width="100%"
  height="100%"
  frameBorder="0"
  title="Superset Dashboard"
/>
```

## Troubleshooting

### CORS Issues
If you see CORS errors in the console:
1. Enable CORS in Superset's `superset_config.py` (see Step 1 above)
2. Restart your Superset instance
3. Check browser console for specific errors

### Authentication Issues
- Superset requires authentication by default
- Either make charts public or use the Embedded SDK with guest tokens
- Guest tokens provide secure, controlled access

### Chart Not Displaying
- Verify the URL is correct
- Check if the chart exists and is accessible
- Ensure embedding is enabled in Superset config
- Check network tab for error responses

## Current Implementation

The current `Dashboard.jsx` uses a simple iframe approach. To use it:

1. Replace `YOUR_SUPERSET_EMBED_URL_HERE` with your actual Superset chart URL
2. Make sure your Superset instance is running
3. Ensure CORS is properly configured if on different domains

## Example URLs

```
# Standalone chart
http://localhost:8088/superset/explore/?standalone=true&form_data=%7B%22slice_id%22%3A123%7D

# Standalone dashboard
http://localhost:8088/superset/dashboard/1/?standalone=true

# Full embed URL (with all parameters)
http://localhost:8088/superset/explore/?standalone=3&height=400&...
```

## Additional Resources

- [Superset Documentation](https://superset.apache.org/docs/intro)
- [Embedded SDK GitHub](https://github.com/apache/superset/tree/master/superset-embedded-sdk)
- [Superset REST API](https://superset.apache.org/docs/rest-api)
