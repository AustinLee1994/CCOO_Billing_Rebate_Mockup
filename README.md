# Power BI Wireframe Template

A production-ready HTML/CSS/JavaScript dashboard template that mirrors your team's Power BI design for rapid wireframing.

## Quick Start

1. **Open in Browser**: Double-click `index.html` or serve via HTTP server
2. **Local Server**: Run `python -m http.server 8000` in this folder, then visit `http://localhost:8000`

## Features

✅ **Interactive Navigation**: Click tabs to switch between Monitor, Analyze, Detail, KPIs, and blank templates  
✅ **Responsive Design**: Works on desktop, tablet, and mobile devices  
✅ **Power BI Styling**: Dark left rail, light canvas, consistent with your team's design  
✅ **Interactive Elements**: 
- Slicer pills (Week/Month/Quarter/Year)
- Region filters (AMERICAS, EMEA, ASIA PACIFIC, GREATER CHINA)  
- Refresh button with loading state
- Keyboard navigation support

✅ **Ready for Data**: JavaScript structure ready to connect to APIs and real data

## Structure

```
Template/
├── index.html      # Main HTML structure
├── styles.css      # All styling with CSS custom properties
├── script.js       # Interactive functionality
└── README.md       # This file
```

## Customization

### Colors & Theme
Edit CSS custom properties in `styles.css`:
```css
:root {
  --kpi-red: #E11D48;
  --kpi-blue: #2563EB;
  --kpi-green: #059669;
  /* ... more theme tokens */
}
```

### Add New KPI Cards
```html
<div class="kpi-card blue">
    <div class="kpi-title">YOUR KPI NAME</div>
    <div class="kpi-content">
        <div class="kpi-main">
            <div class="kpi-value">85.4%</div>
            <div class="kpi-subtitle">Your subtitle</div>
        </div>
        <div class="kpi-trend">trend</div>
    </div>
</div>
```

### Connect Real Data
Use the JavaScript functions in `script.js`:
```javascript
// Update KPI values
window.DashboardApp.updateKPIValues();

// Track interactions
window.DashboardApp.trackTabView('Monitor');

// Refresh data
window.DashboardApp.refreshData('regions', ['AMERICAS', 'EMEA']);
```

## Browser Requirements

- Modern browsers (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- Internet connection for Lucide icons

## Troubleshooting

**Icons not showing?** 
- Check internet connection (icons load from CDN)
- Ensure JavaScript is enabled

**Styling broken?** 
- Make sure `styles.css` is in the same folder as `index.html`
- Check browser console for errors

**Interactive features not working?**
- Make sure `script.js` is in the same folder as `index.html`
- Check browser console for JavaScript errors

---

Ready to wireframe your Power BI dashboards! 🚀
