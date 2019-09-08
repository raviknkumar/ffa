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

exports.formatDateHiphen = function(date){
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

exports.logout = function(localStorage , router){
    localStorage.removeItem('auth-token')
    localStorage.removeItem('auth')
    localStorage.removeItem('user')
    router.push('/login')
}
