# 🛡️ Hybrid Phishing Detection Chrome Extension

A Chrome extension that detects phishing websites using a **hybrid approach**:
- Real-time blacklist verification (OpenPhish)
- Client-side machine learning–based heuristic analysis

## 🔍 Detection Architecture

### 1️⃣ Blacklist-Based Detection (Primary)
- Uses the **OpenPhish live feed**
- URLs are fetched and cached locally using `chrome.storage`
- Provides fast and reliable detection of known phishing domains

### 2️⃣ Machine Learning–Based Detection (Secondary)
- Uses a **pre-trained linear ML classifier**
- Runs entirely in the browser (no backend required)
- Classifies websites using **URL and DOM-based phishing features**

#### Extracted Features Include:
- IP address usage in URL
- URL length and redirection patterns
- Multiple subdomains
- External images, scripts, and anchors
- Suspicious form actions
- Mailto links
- iFrames and status bar manipulation

## 🧠 ML Model Details
- Pre-trained linear classifier
- Feature weights embedded in JavaScript
- Produces a phishing / legitimate verdict based on feature scoring
- Explainable and lightweight (SOC-friendly)

## 🧰 Tech Stack
- JavaScript
- Chrome Extension Manifest V3
- OpenPhish Threat Intelligence Feed
- HTML, CSS
- jQuery

## 🚀 How to Install
1. Open Chrome → `chrome://extensions`
2. Enable **Developer Mode**
3. Click **Load unpacked**
4. Select the `chrome-extension/` folder

## 🎯 Use Case
This project demonstrates:
- Browser-based phishing detection
- Threat intelligence integration
- ML heuristic analysis
- SOC and Blue Team–relevant security controls
