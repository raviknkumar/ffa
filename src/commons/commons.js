exports.showErrorDialog = function(swal,message) {
    swal({
        position: 'top',
        type: 'error',
        title: 'Error',
        text: message,
        showConfirmButton: false,
        timer: 1500
    });
};
exports.showWarningDialog = function(swal,message) {
    swal({
        position: 'top',
        type: 'warning',
        title: 'Alert',
        text: message,
        showConfirmButton: false,
        timer: 1500
    });
};

exports.showSuccessDialog = function(swal,message) {
    swal({
        position: 'top',
        type: 'success',
        title: 'Alert',
        text: message,
        showConfirmButton: false,
        timer: 1500
    });
};