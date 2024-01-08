// ErrorBoundary.js
import React, { Component } from "react";
import { toast } from "react-toastify";

class ErrorBoundary extends Component {
  componentDidCatch(error, errorInfo) {
    // Log error information
    console.error("Error Boundry caught by error boundary:", error, errorInfo);

    // Display a user-friendly error message
    toast.error("An unexpected error occurred. Please try again.");
  }

  render() {
    return this.props.children;
  }
}

export default ErrorBoundary;
