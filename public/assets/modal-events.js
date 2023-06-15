/* eslint-disable no-undef */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
const changeEvent = new CustomEvent('change');
const stateModal = document.getElementById('stateModal');
stateModal.addEventListener('hide.bs.modal', function (event) {
    if (typeof showDonationBoxModal === 'function') {
        showDonationBoxModal();
    } else {
        showDonorModal();
    }
});
const cityModal = document.getElementById('cityModal');
cityModal.addEventListener('hide.bs.modal', function (event) {
    if (typeof showDonationBoxModal === 'function') {
        showDonationBoxModal();
    } else {
        showDonorModal();
    }
});
const areaModal = document.getElementById('areaModal');
areaModal.addEventListener('hide.bs.modal', function (event) {
    var ele = document.getElementById('city-form');
    ele ? ele.dispatchEvent(changeEvent) : '';
    if (typeof showDonationBoxModal === 'function') {
        showDonationBoxModal();
    } else {
        showDonorModal();
    }
});
const societyModal = document.getElementById('societyModal');
societyModal.addEventListener('hide.bs.modal', function (event) {
    var ele = document.getElementById('area-form');
    ele ? ele.dispatchEvent(changeEvent) : '';
    if (typeof showDonationBoxModal === 'function') {
        showDonationBoxModal();
    } else {
        showDonorModal();
    }
});
const apartmentModal = document.getElementById('apartmentModal');
apartmentModal.addEventListener('hide.bs.modal', function (event) {
    var ele = document.getElementById('society-form');
    ele ? ele.dispatchEvent(changeEvent) : '';
    if (typeof showDonationBoxModal === 'function') {
        showDonationBoxModal();
    } else {
        showDonorModal();
    }
});
const addressRemarkModal = document.getElementById('addressRemarkModal');
addressRemarkModal.addEventListener('hide.bs.modal', function (event) {
    var ele = document.getElementById('society-form');
    ele ? ele.dispatchEvent(changeEvent) : '';
    if (typeof showDonationBoxModal === 'function') {
        showDonationBoxModal();
    } else {
        showDonorModal();
    }
});
const donationCollectorModal = document.getElementById('donationCollectorModal');
donationCollectorModal.addEventListener('hide.bs.modal', function (event) {
    showDonationBoxModal();
});
/* const donorModal = document.getElementById('donorModal');
donorModal.addEventListener('hide.bs.modal', function (event) {
    if ($('.modal').css('display') == 'none') {
        showDonationModal();
    }
}); */
$(document).on('change', '#areaModal-state-name', function () {
    var selected = this.value;
    if (selected) {
        getCities(selected, '#areaModal-city-name');
    }
});

$(document).on('change', '#societyModal-state-name', function () {
    var selected = this.value;
    if (selected) {
        getCities(selected, '#societyModal-city-name');
    }
});

$(document).on('change', '#societyModal-city-name', function () {
    var selected = this.value;
    if (selected) {
        getAreas(selected, '#societyModal-area-name');
    }
});

$(document).on('change', '#aptmtModal-state-name', function () {
    var selected = this.value;
    if (selected) {
        getCities(selected, '#aptmtModal-city-name');
    }
});

$(document).on('change', '#aptmtModal-city-name', function () {
    var selected = this.value;
    if (selected) {
        getAreas(selected, '#aptmtModal-area-name');
    }
});

$(document).on('change', '#aptmtModal-area-name', function () {
    var selected = this.value;
    var city_id = $('#aptmtModal-city-name').val();
    if (selected) {
        getSocieties(selected, city_id, '#aptmtModal-society-name');
    }
});

$(document).on('change', '#addremarkModal-state-name', function () {
    var selected = this.value;
    if (selected) {
        getCities(selected, '#addremarkModal-city-name');
    }
});

$(document).on('change', '#addremarkModal-city-name', function () {
    var selected = this.value;
    if (selected) {
        getAreas(selected, '#addremarkModal-area-name');
    }
});

$(document).on('change', '#addremarkModal-area-name', function () {
    var selected = this.value;
    var city_id = $('#addremarkModal-city-name').val();
    if (selected) {
        getSocieties(selected, city_id, '#addremarkModal-society-name');
    }
});

$(document).on('change', '#addDonorModal-state-name', function () {
    var selected = this.value;
    if (selected) {
        getCities(selected, '#addDonorModal-city-name');
    }
});

$(document).on('change', '#addDonorModal-city-name', function () {
    var selected = this.value;
    if (selected) {
        getAreas(selected, '#addDonorModal-area-name');
    }
});

$(document).on('change', '#addDonorModal-area-name', function () {
    var selected = this.value;
    var city_id = $('#addDonorModal-city-name').val();
    if (selected) {
        getSocieties(selected, city_id, '#addDonorModal-society-name');
    }
});

$(document).on('change', '#addDonorModal-society-name', function () {
    var selected = this.value;
    if (selected) {
        getApartments(selected, '#addDonorModal-apt-name');
        var area_val = $('#addDonorModal-area-name').val();
        if (area_val) {
            getAddressRemarks(selected, area_val, '#addDonorModal-addremark-name');
        }
    }
});

$('#stateForm').validate({
    errorElement: 'em',
    errorClass: 'error invalid',
    rules: {
        'stateModal-state-name': { required: true }
    },
    errorPlacement: function (error, element) {
        if (element.attr('id') == 'stateModal-state-name') {
            error.appendTo('#err-stateModal-state-name');
        }
    },
    submitHandler: function (form) {
        var formData = new FormData(form);
        $.ajax({
            type: 'post',
            url: '/panel/common-data/save-state',
            data: formData,
            processData: false,
            contentType: false,
            // context: this,
            dataType: 'json',
            beforeSend: function (xhr) {
                $('#loader-bg').show();
            },
            success: function (response) {
                $('#loader-bg').hide();
                if (response.flag == true) {
                    toastr.success(response.message, 'Success');
                    // $(form)[0].reset();
                } else {
                    toastr.error(response.message, 'Error');
                }
            },
            failure: function (response) {
                $('#loader-bg').hide();
                toastr.error('Oops, something went wrong...!', '500 | Internal Error');
            }
        });
    }
});

$('#cityForm').validate({
    errorElement: 'em',
    errorClass: 'error invalid',
    rules: {
        'cityModal-state-name': { required: true },
        'cityModal-city-name': { required: true },
    },
    errorPlacement: function (error, element) {
        if (element.attr('id') == 'cityModal-state-name') {
            error.appendTo('#err-cityModal-state-name');
        } else if (element.attr('id') == 'cityModal-city-name') {
            error.appendTo('#err-cityModal-city-name');
        }
    },
    submitHandler: function (form) {
        var formData = new FormData(form);
        $.ajax({
            type: 'post',
            url: '/panel/common-data/save-city',
            data: formData,
            processData: false,
            contentType: false,
            // context: this,
            dataType: 'json',
            beforeSend: function (xhr) {
                $('#loader-bg').show();
            },
            success: function (response) {
                $('#loader-bg').hide();
                if (response.flag == true) {
                    toastr.success(response.message, 'Success');
                    // $(form)[0].reset();
                } else {
                    toastr.error(response.message, 'Error');
                }
            },
            failure: function (response) {
                $('#loader-bg').hide();
                toastr.error('Oops, something went wrong...!', '500 | Internal Error');
            }
        });
    }
});

$('#areaForm').validate({
    errorElement: 'em',
    errorClass: 'error invalid',
    rules: {
        'areaModal-state-name': { required: true },
        'areaModal-city-name': { required: true },
        'areaModal-area-name': { required: true },
    },
    errorPlacement: function (error, element) {
        if (element.attr('id') == 'areaModal-state-name') {
            error.appendTo('#err-areaModal-state-name');
        } else if (element.attr('id') == 'areaModal-city-name') {
            error.appendTo('#err-areaModal-city-name');
        } else if (element.attr('id') == 'areaModal-area-name') {
            error.appendTo('#err-areaModal-area-name');
        }
    },
    submitHandler: function (form) {
        var formData = new FormData(form);
        $.ajax({
            type: 'post',
            url: '/panel/common-data/save-area',
            data: formData,
            processData: false,
            contentType: false,
            // context: this,
            dataType: 'json',
            beforeSend: function (xhr) {
                $('#loader-bg').show();
            },
            success: function (response) {
                $('#loader-bg').hide();
                if (response.flag == true) {
                    toastr.success(response.message, 'Success');
                    // $(form)[0].reset();
                } else {
                    toastr.error(response.message, 'Error');
                }
            },
            failure: function (response) {
                $('#loader-bg').hide();
                toastr.error('Oops, something went wrong...!', '500 | Internal Error');
            }
        });
    }
});

$('#societyForm').validate({
    errorElement: 'em',
    errorClass: 'error invalid',
    rules: {
        'societyModal-state-name': { required: true },
        'societyModal-city-name': { required: true },
        'societyModal-area-name': { required: true },
        'societyModal-society-name': { required: true },
    },
    errorPlacement: function (error, element) {
        if (element.attr('id') == 'societyModal-state-name') {
            error.appendTo('#err-societyModal-state-name');
        } else if (element.attr('id') == 'societyModal-city-name') {
            error.appendTo('#err-societyModal-city-name');
        } else if (element.attr('id') == 'societyModal-area-name') {
            error.appendTo('#err-societyModal-area-name');
        } else if (element.attr('id') == 'societyModal-society-name') {
            error.appendTo('#err-societyModal-society-name');
        }
    },
    submitHandler: function (form) {
        var formData = new FormData(form);
        $.ajax({
            type: 'post',
            url: '/panel/common-data/save-society',
            data: formData,
            processData: false,
            contentType: false,
            // context: this,
            dataType: 'json',
            beforeSend: function (xhr) {
                $('#loader-bg').show();
            },
            success: function (response) {
                $('#loader-bg').hide();
                if (response.flag == true) {
                    toastr.success(response.message, 'Success');
                    // $(form)[0].reset();
                } else {
                    toastr.error(response.message, 'Error');
                }
            },
            failure: function (response) {
                $('#loader-bg').hide();
                toastr.error('Oops, something went wrong...!', '500 | Internal Error');
            }
        });
    }
});

$('#aptmtForm').validate({
    errorElement: 'em',
    errorClass: 'error invalid',
    rules: {
        'aptmtModal-state-name': { required: true },
        'aptmtModal-city-name': { required: true },
        'aptmtModal-area-name': { required: true },
        'aptmtModal-society-name': { required: true },
        'aptmtModal-aptmt-name': { required: true },
        'aptmtModal-person-name': { required: true },
        'aptmtModal-person-mobile': { required: true, number: true, rangelength: [10, 10] },
    },
    errorPlacement: function (error, element) {
        if (element.attr('id') == 'aptmtModal-state-name') {
            error.appendTo('#err-aptmtModal-state-name');
        } else if (element.attr('id') == 'aptmtModal-city-name') {
            error.appendTo('#err-aptmtModal-city-name');
        } else if (element.attr('id') == 'aptmtModal-area-name') {
            error.appendTo('#err-aptmtModal-area-name');
        } else if (element.attr('id') == 'aptmtModal-society-name') {
            error.appendTo('#err-aptmtModal-society-name');
        } else if (element.attr('id') == 'aptmtModal-aptmt-name') {
            error.appendTo('#err-aptmtModal-aptmt-name');
        } else if (element.attr('id') == 'aptmtModal-person-name') {
            error.appendTo('#err-aptmtModal-person-name');
        } else if (element.attr('id') == 'aptmtModal-person-mobile') {
            error.appendTo('#err-aptmtModal-person-mobile');
        }
    },
    submitHandler: function (form) {
        var formData = new FormData(form);
        $.ajax({
            type: 'post',
            url: '/panel/common-data/save-apartment',
            data: formData,
            processData: false,
            contentType: false,
            // context: this,
            dataType: 'json',
            beforeSend: function (xhr) {
                $('#loader-bg').show();
            },
            success: function (response) {
                $('#loader-bg').hide();
                if (response.flag == true) {
                    toastr.success(response.message, 'Success');
                    // $(form)[0].reset();
                } else {
                    toastr.error(response.message, 'Error');
                }
            },
            failure: function (response) {
                $('#loader-bg').hide();
                toastr.error('Oops, something went wrong...!', '500 | Internal Error');
            }
        });
    }
});

$('#addremarkForm').validate({
    errorElement: 'em',
    errorClass: 'error invalid',
    rules: {
        'addremarkModal-state-name': { required: true },
        'addremarkModal-city-name': { required: true },
        'addremarkModal-area-name': { required: true },
        'addremarkModal-society-name': { required: true },
        'addremarkModal-addremark-name': { required: true },
    },
    errorPlacement: function (error, element) {
        if (element.attr('id') == 'addremarkModal-state-name') {
            error.appendTo('#err-addremarkModal-state-name');
        } else if (element.attr('id') == 'addremarkModal-city-name') {
            error.appendTo('#err-addremarkModal-city-name');
        } else if (element.attr('id') == 'addremarkModal-area-name') {
            error.appendTo('#err-addremarkModal-area-name');
        } else if (element.attr('id') == 'addremarkModal-society-name') {
            error.appendTo('#err-addremarkModal-society-name');
        } else if (element.attr('id') == 'addremarkModal-addremark-name') {
            error.appendTo('#err-addremarkModal-addremark-name');
        }
    },
    submitHandler: function (form) {
        var formData = new FormData(form);
        $.ajax({
            type: 'post',
            url: '/panel/common-data/save-address-remark',
            data: formData,
            processData: false,
            contentType: false,
            // context: this,
            dataType: 'json',
            beforeSend: function (xhr) {
                $('#loader-bg').show();
            },
            success: function (response) {
                $('#loader-bg').hide();
                if (response.flag == true) {
                    toastr.success(response.message, 'Success');
                    // $(form)[0].reset();
                } else {
                    toastr.error(response.message, 'Error');
                }
            },
            failure: function (response) {
                $('#loader-bg').hide();
                toastr.error('Oops, something went wrong...!', '500 | Internal Error');
            }
        });
    }
});

$('#donationCollectorForm').validate({
    errorElement: 'em',
    errorClass: 'error invalid',
    rules: {
        'donationCollectorModal-donationCollector-name': { required: true },
        'donationCollectorModal-salary': { required: true, number: true },
    },
    errorPlacement: function (error, element) {
        if (element.attr('id') == 'donationCollectorModal-donationCollector-name') {
            error.appendTo('#err-donationCollectorModal-donationCollector-name');
        } else if (element.attr('id') == 'donationCollectorModal-salary') {
            error.appendTo('#err-donationCollectorModal-salary');
        }
    },
    submitHandler: function (form) {
        var formData = new FormData(form);
        $.ajax({
            type: 'post',
            url: '/panel/donation-collector/add',
            data: formData,
            processData: false,
            contentType: false,
            // context: this,
            dataType: 'json',
            beforeSend: function (xhr) {
                $('#loader-bg').show();
            },
            success: function (response) {
                $('#loader-bg').hide();
                if (response.flag == true) {
                    toastr.success(response.message, 'Success');
                    $(form)[0].reset();
                } else {
                    toastr.error(response.message, 'Error');
                }
            },
            failure: function (response) {
                $('#loader-bg').hide();
                toastr.error('Oops, something went wrong...!', '500 | Internal Error');
            }
        });
    }
});

let donorBtn = document.getElementById('add-donor');
function showDonorModal() {
    donorBtn.click();
}

$('#addDonorForm').validate({
    errorElement: 'em',
    errorClass: 'error invalid',
    rules: {
        'addDonorModal-state-name': { required: true },
        'addDonorModal-city-name': { required: true },
        'addDonorModal-area-name': { required: true },
        'addDonorModal-society-name': { required: true },
        'addDonorModal-addremark-name': { required: true },
        'addDonorModal-addDonor-mobile': { required: true, number: true, rangelength: [10, 10] },
        'addDonorModal-addDonor-name': { required: true },
        'addDonorModal-house-no': { required: true },
        'addDonorModal-apt-name': { required: true },
    },
    errorPlacement: function (error, element) {
        if (element.attr('id') == 'addDonorModal-state-name') {
            error.appendTo('#err-addDonorModal-state-name');
        } else if (element.attr('id') == 'addDonorModal-city-name') {
            error.appendTo('#err-addDonorModal-city-name');
        } else if (element.attr('id') == 'addDonorModal-area-name') {
            error.appendTo('#err-addDonorModal-area-name');
        } else if (element.attr('id') == 'addDonorModal-society-name') {
            error.appendTo('#err-addDonorModal-society-name');
        } else if (element.attr('id') == 'addDonorModal-addremark-name') {
            error.appendTo('#err-addDonorModal-addremark-name');
        } else if (element.attr('id') == 'addDonorModal-addDonor-mobile') {
            error.appendTo('#err-addDonorModal-addDonor-mobile');
        } else if (element.attr('id') == 'addDonorModal-addDonor-name') {
            error.appendTo('#err-addDonorModal-addDonor-name');
        } else if (element.attr('id') == 'addDonorModal-house-no') {
            error.appendTo('#err-addDonorModal-house-no');
        } else if (element.attr('id') == 'addDonorModal-apt-name') {
            error.appendTo('#err-addDonorModal-apt-name');
        }
    },
    submitHandler: function (form) {
        var formData = new FormData(form);
        $.ajax({
            type: 'post',
            url: '/panel/donor/save',
            data: formData,
            processData: false,
            contentType: false,
            // context: this,
            dataType: 'json',
            beforeSend: function (xhr) {
                $('#loader-bg').show();
            },
            success: function (response) {
                $('#loader-bg').hide();
                if (response.flag == true) {
                    toastr.success(response.message, 'Success');
                    // donationModal ? donationModal.style.display = 'block' : '';
                    // $(form)[0].reset();
                } else {
                    toastr.error(response.message, 'Error');
                }
            },
            failure: function (response) {
                $('#loader-bg').hide();
                toastr.error('Oops, something went wrong...!', '500 | Internal Error');
            }
        });
    }
});
