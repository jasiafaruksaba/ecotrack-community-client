// Example using react-hot-toast (install with: npm install react-hot-toast)
import toast from 'react-hot-toast';

export const successToast = (message) => {
  toast.success(message, {
    style: {
      border: '1px solid #4CAF50',
      padding: '16px',
      color: '#333',
    },
    iconTheme: {
      primary: '#4CAF50',
      secondary: '#FFFAEE',
    },
  });
};

export const errorToast = (message) => {
  toast.error(message, {
    style: {
      border: '1px solid #F44336',
      padding: '16px',
      color: '#333',
    },
    iconTheme: {
      primary: '#F44336',
      secondary: '#FFFAEE',
    },
  });
};