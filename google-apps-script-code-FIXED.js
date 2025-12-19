/**
 * Google Apps Script for Portfolio Contact Form - FIXED VERSION
 * 
 * This version handles form data correctly and fixes the "Cannot read properties" error
 * 
 * Setup Instructions:
 * 1. Create a Google Sheet with headers: NAME, EMAIL, SUBJECT, MESSAGE, TIMESTAMP
 * 2. Go to Extensions → Apps Script
 * 3. Delete old code
 * 4. Paste THIS code
 * 5. Save
 * 6. Deploy → New deployment → Web app
 * 7. Set "Who has access" to "Anyone"
 * 8. Copy the Web App URL and update it in index.html
 */

const SHEET_NAME = "PortfolioContactForm";
const YOUR_EMAIL = "gunaseelanvinothv@gmail.com";

function doPost(e) {
  try {
    // Log the entire request for debugging
    Logger.log('=== Form Submission Received ===');
    Logger.log('Request object exists:', e ? 'YES' : 'NO');
    
    // Log all properties of e to see what we have
    if (e) {
      Logger.log('e.parameter exists:', e.parameter ? 'YES' : 'NO');
      if (e.parameter) {
        Logger.log('e.parameter keys:', Object.keys(e.parameter).join(', '));
        Logger.log('e.parameter values:', JSON.stringify(e.parameter));
      }
      
      Logger.log('e.postData exists:', e.postData ? 'YES' : 'NO');
      if (e.postData) {
        Logger.log('e.postData.type:', e.postData.type);
        Logger.log('e.postData.contents exists:', e.postData.contents ? 'YES' : 'NO');
        if (e.postData.contents) {
          Logger.log('e.postData.contents (first 500 chars):', e.postData.contents.substring(0, 500));
        }
      }
      
      Logger.log('e.queryString exists:', e.queryString ? 'YES' : 'NO');
      if (e.queryString) {
        Logger.log('e.queryString:', e.queryString);
      }
      
      // Log all keys in e
      Logger.log('All keys in e:', Object.keys(e).join(', '));
    }
    
    // Initialize variables
    let name = 'Not provided';
    let email = 'Not provided';
    let subject = 'Portfolio Contact';
    let message = 'No message';
    let dataFound = false;
    
    // Method 1: Try to get from e.parameter (URL-encoded data)
    if (e && e.parameter && Object.keys(e.parameter).length > 0) {
      Logger.log('Using e.parameter method');
      name = e.parameter.NAME || e.parameter.name || 'Not provided';
      email = e.parameter.EMAIL || e.parameter.email || 'Not provided';
      subject = e.parameter.SUBJECT || e.parameter.subject || 'Portfolio Contact';
      message = e.parameter.MESSAGE || e.parameter.message || 'No message';
      dataFound = true;
      Logger.log('Data from parameters:', { name, email, subject, message: message.substring(0, 50) + '...' });
    }
    // Method 2: Try to get from postData.contents (FormData or URL-encoded string)
    else if (e && e.postData && e.postData.contents) {
      Logger.log('Using postData.contents method');
      const contents = e.postData.contents;
      Logger.log('Raw contents length:', contents.length);
      Logger.log('Raw contents (first 500):', contents.substring(0, 500));
      
      // Parse URL-encoded string
      const params = {};
      const pairs = contents.split('&');
      Logger.log('Number of pairs found:', pairs.length);
      
      for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i].split('=');
        if (pair.length === 2) {
          const key = decodeURIComponent(pair[0].replace(/\+/g, ' '));
          const value = decodeURIComponent(pair[1].replace(/\+/g, ' '));
          params[key] = value;
          Logger.log('Parsed pair:', key, '=', value.substring(0, 50));
        }
      }
      
      if (Object.keys(params).length > 0) {
        name = params.NAME || params.name || 'Not provided';
        email = params.EMAIL || params.email || 'Not provided';
        subject = params.SUBJECT || params.subject || 'Portfolio Contact';
        message = params.MESSAGE || params.message || 'No message';
        dataFound = true;
        Logger.log('Data from postData:', { name, email, subject, message: message.substring(0, 50) + '...' });
      }
    }
    // Method 3: Try queryString
    else if (e && e.queryString) {
      Logger.log('Using queryString method');
      const params = {};
      const pairs = e.queryString.split('&');
      for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i].split('=');
        if (pair.length === 2) {
          const key = decodeURIComponent(pair[0].replace(/\+/g, ' '));
          const value = decodeURIComponent(pair[1].replace(/\+/g, ' '));
          params[key] = value;
        }
      }
      
      if (Object.keys(params).length > 0) {
        name = params.NAME || params.name || 'Not provided';
        email = params.EMAIL || params.email || 'Not provided';
        subject = params.SUBJECT || params.subject || 'Portfolio Contact';
        message = params.MESSAGE || params.message || 'No message';
        dataFound = true;
        Logger.log('Data from queryString:', { name, email, subject, message: message.substring(0, 50) + '...' });
      }
    }
    
    // If no data found, return error
    if (!dataFound) {
      Logger.log('ERROR: No data found in request');
      Logger.log('Full request object structure:');
      try {
        Logger.log(JSON.stringify(e, null, 2));
      } catch (jsonError) {
        Logger.log('Could not stringify request object');
        Logger.log('e type:', typeof e);
        Logger.log('e keys:', Object.keys(e || {}));
      }
      return ContentService.createTextOutput(
        JSON.stringify({
          'result': 'error',
          'message': 'No form data received. Check logs for request structure.'
        })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Create timestamp
    const timestamp = new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });
    
    Logger.log('Final parsed data:', { name, email, subject, timestamp });
    
    // Save to Google Sheet
    try {
      const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
      if (!spreadsheet) {
        Logger.log('WARNING: No active spreadsheet found');
      } else {
        let sheet = spreadsheet.getSheetByName(SHEET_NAME);
        if (!sheet) {
          // Create sheet if it doesn't exist
          sheet = spreadsheet.insertSheet(SHEET_NAME);
          sheet.appendRow(['NAME', 'EMAIL', 'SUBJECT', 'MESSAGE', 'TIMESTAMP']);
        }
        
        // Add headers if sheet is empty
        if (sheet.getLastRow() === 0) {
          sheet.appendRow(['NAME', 'EMAIL', 'SUBJECT', 'MESSAGE', 'TIMESTAMP']);
        }
        
        sheet.appendRow([name, email, subject, message, timestamp]);
        Logger.log('Data saved to sheet successfully');
      }
    } catch (sheetError) {
      Logger.log('Sheet error (non-critical):', sheetError);
      // Continue even if sheet fails
    }
    
    // Send email notification
    try {
      const emailSubject = `📧 New Contact: ${subject}`;
      const emailBody = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  NEW MESSAGE FROM YOUR PORTFOLIO WEBSITE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Name: ${name}
📧 Email: ${email}
📝 Subject: ${subject}
🕐 Time: ${timestamp}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💬 Message:
${message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Reply directly to this email to respond to ${name} (${email})
      `;
      
      MailApp.sendEmail({
        to: YOUR_EMAIL,
        subject: emailSubject,
        body: emailBody,
        replyTo: email,
        name: 'Portfolio Contact Form'
      });
      
      Logger.log('Email sent successfully');
    } catch (emailError) {
      Logger.log('Email error:', emailError);
      // Continue even if email fails
    }
    
    // Return success response
    Logger.log('=== Form processed successfully ===');
    return ContentService.createTextOutput(
      JSON.stringify({
        'result': 'success',
        'message': 'Message sent successfully'
      })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log('=== ERROR PROCESSING FORM ===');
    Logger.log('Error type:', error.name);
    Logger.log('Error message:', error.message);
    Logger.log('Error stack:', error.stack);
    Logger.log('Full error:', error.toString());
    
    // Return error response
    return ContentService.createTextOutput(
      JSON.stringify({
        'result': 'error',
        'message': error.toString()
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // Test endpoint
  return ContentService.createTextOutput("✅ Contact Form API is running!")
    .setMimeType(ContentService.MimeType.TEXT);
}

// Test function - run this in Apps Script editor to test
function testFormSubmission() {
  const testData = {
    parameter: {
      NAME: 'Test User',
      EMAIL: 'test@example.com',
      SUBJECT: 'Test Message',
      MESSAGE: 'This is a test message from the portfolio form.'
    }
  };
  
  const result = doPost(testData);
  Logger.log('Test result:', result.getContent());
}

