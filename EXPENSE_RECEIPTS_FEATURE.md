# Expense Receipts Feature

## Overview
The Car Wholesaler Inventory Management System now supports receipt attachments for each expense line item. This feature allows users to upload and manage digital copies of receipts, invoices, and other expense-related documents directly associated with each expense.

## Features

### 1. Receipt Upload
- **Multiple Files**: Upload multiple receipts per expense
- **File Types**: Supports images (JPG, PNG, GIF) and PDF documents
- **Bulk Upload**: Select and upload multiple files at once
- **File Size Display**: Shows file size for each uploaded receipt

### 2. Receipt Management

#### Adding Receipts to Existing Expenses
1. Click the **"Add Receipt"** button on any expense line item
2. Select one or more files from your device
3. Files are automatically attached to the expense
4. The button updates to show the receipt count (e.g., "2 Receipts")

#### Adding Receipts When Creating New Expenses
1. When adding a new expense, there's a **"Receipts"** section in the form
2. Click **"Add Receipt"** to upload files before saving the expense
3. View and remove receipts before finalizing the expense
4. All receipts are saved with the new expense

### 3. Viewing Receipts
- Click the **"View"** button next to the receipt count on any expense
- Opens a modal showing all receipts for that expense
- Receipt details include:
  - File name
  - File size
  - Upload date
  - Visual preview (images) or file type icon (PDFs)

### 4. Receipt Deletion
- **In Edit Mode**: Hover over any receipt to show the delete button
- **Confirmation**: System asks for confirmation before deleting
- **Bulk Management**: Can delete individual receipts without affecting the expense

### 5. User Interface

#### Expense Line Items
Each expense now displays:
- Receipt count badge (e.g., "2 Receipts")
- "Add Receipt" button (changes to receipt count when receipts exist)
- "View" button to see all receipts

#### Receipt Modal
- Grid layout showing 2 receipts per row
- Image previews for image files
- PDF icon for PDF documents
- File information below each receipt
- Delete button (in edit mode)
- "Add More" button to upload additional receipts

#### Add Expense Modal
- Dedicated "Receipts" section
- List of uploaded receipts with remove option
- Upload button to add more receipts
- File information display

## Technical Implementation

### Data Structure
```typescript
type Receipt = {
  id: string
  name: string
  url: string
  size: string
  uploadedAt: string
}

type Expense = {
  id: string
  category: string
  amount: number
  description: string
  date: string
  receipts: Receipt[]  // New field
}
```

### Key Functions
- `handleUploadReceipt(expenseId)`: Handles receipt upload for existing expenses
- `handleViewReceipts(expenseId)`: Opens the receipt viewing modal
- `handleDeleteReceipt(expenseId, receiptId)`: Deletes a specific receipt
- Receipt upload in new expense form: Inline handling within the modal

## Use Cases

1. **Expense Documentation**
   - Attach purchase receipts to vehicle parts expenses
   - Upload service invoices for repair expenses
   - Document transportation fees with carrier receipts

2. **Audit Trail**
   - Maintain digital copies of all expense documentation
   - Easy access to receipts for accounting purposes
   - Verification of expense amounts with original documents

3. **Expense Verification**
   - Compare logged expense amounts with receipt totals
   - Verify expense categories with receipt details
   - Track warranty information from receipts

## Best Practices

1. **File Organization**
   - Upload receipts immediately after adding expenses
   - Use clear file names for easy identification
   - Keep file sizes reasonable (compress large images if needed)

2. **Regular Maintenance**
   - Review and clean up old receipts periodically
   - Ensure all significant expenses have receipts attached
   - Replace unclear photos with better quality scans

3. **Security Considerations**
   - In production, implement proper file storage (cloud storage, CDN)
   - Add file type validation and virus scanning
   - Implement proper access controls for sensitive documents

## Future Enhancements

1. **OCR Integration**
   - Automatically extract expense amount from receipts
   - Parse vendor information and expense categories
   - Auto-fill expense forms from receipt data

2. **Advanced Features**
   - Receipt search functionality
   - Bulk receipt download
   - Receipt categorization and tagging
   - Integration with accounting software

3. **Mobile Optimization**
   - Camera integration for mobile receipt capture
   - Mobile-friendly receipt viewer
   - Offline receipt storage 