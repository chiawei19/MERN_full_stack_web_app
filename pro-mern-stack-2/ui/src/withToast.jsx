import React from 'react';
import Toast from './Toast.jsx';

export default function withToast(OriginalComponent) {
  return class ToastWrapper extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        toastType: 'success', toastVisible: false, toastMessage: '',
      };
      this.dismissToast = this.dismissToast.bind(this);
      this.showSuccess = this.showSuccess.bind(this);
      this.showError = this.showError.bind(this);
    }

    dismissToast() {
      this.setState({ toastVisible: false });
    }

    showSuccess(message) {
      this.setState({ toastVisible: true, toastMessage: message, toastType: 'success' });
    }

    showError(message) {
      this.setState({ toastVisible: true, toastMessage: message, toastType: 'danger' });
    }

    render() {
      const { toastType, toastVisible, toastMessage } = this.state;
      return (
        <React.Fragment>
          <OriginalComponent
            showError={this.showError}
            showSuccess={this.showSuccess}
            dismissToast={this.dismissToast}
            {...this.props}
          />
          <Toast
            bsStyle={toastType}
            showing={toastVisible}
            onDismiss={this.dismissToast}
          >
            {toastMessage}
          </Toast>
        </React.Fragment>
      );
    }
  };
}
