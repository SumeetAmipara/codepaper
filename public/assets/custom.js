/* eslint-disable no-undef */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
var dtdt = new Date;
var currentDate = dtdt.toISOString().slice(0, 10);
var stateOptions = cityOptions = areaOptions = societyOptions = aptOptions = '<option value=""></option>';
var stateID = '', cityID = '', areaID = '', societyID = '', aptID = '';

setTimeout(() => {
    $('.min-date').attr('min', currentDate).val(currentDate);
}, 1000);

async function getStates() {
	$.ajax({
        type: 'get',
        url: '/panel/common-data/get-states',
        async: false,
        processData: false,
        contentType: false,
        context: this,
        dataType: 'json',
        success: function (response) {
            if (response.flag) {
                response.data.forEach(function (v, i) {
                    stateOptions += `<option value="${v.id}">${v.state_name}</option>`;
                });
            }
        }
    });
}

function setStates(elementIDs) {
    elementIDs.forEach((v, i) => {
        $(v).append(stateOptions).trigger('change');
    });
}

async function getCities(state_id, ele_id = '') {
    if (state_id != stateID) {
        cityOptions = '<option value=""></option>';
        $.ajax({
            type: 'get',
            url: `/panel/common-data/get-cities/${state_id}`,
            dataType: 'json',
            async: false,
            success: function (response) {
                if (response.flag) {
                    let data = response.data;
                    data.forEach(function (v, i) {
                        cityOptions += `<option value="${v.id}">${v.city_name}</option>`;
                    });
                }
            }
        });
        stateID = state_id;
    }
    $(ele_id).html(cityOptions).trigger('change');
}

function setCities(elementIDs) {
    elementIDs.forEach((v, i) => {
        $(v).append(cityOptions).trigger('change');
    });
}

async function getAreas(city_id, ele_id) {
    if (city_id != cityID) {
        areaOptions = '<option value=""></option>';
        $.ajax({
            type: 'get',
            url: `/panel/common-data/get-areas/${city_id}`,
            dataType: 'json',
            async: false,
            success: function (response) {
                if (response.flag) {
                    let data = response.data;
                    data.forEach(function (v, i) {
                        areaOptions += `<option value="${v.id}">${v.area_name}</option>`;
                    });
                }
            }
        });
        cityID = city_id;
    }
    $(ele_id).html(areaOptions).trigger('change');
}

async function getSocieties(area_id, city_id, ele_id) {
    if (area_id != areaID) {
        societyOptions = '<option value=""></option>';
        $.ajax({
            type: 'get',
            url: `/panel/common-data/get-societies/${area_id}/${city_id}`,
            dataType: 'json',
            async: false,
            success: function (response) {
                if (response.flag) {
                    let data = response.data;
                    data.forEach(function (v, i) {
                        societyOptions += `<option value="${v.id}">${v.society_name}</option>`;
                    });
                }
            }
        });
        areaID = area_id;
    }
    $(ele_id).html(societyOptions).trigger('change');
}

async function getApartments(society_id, ele_id) {
    if (society_id != societyID) {
        aptOptions = '<option value=""></option>';
        $.ajax({
            type: 'get',
            url: `/panel/common-data/get-apartments/${society_id}`,
            dataType: 'json',
            async: false,
            success: function (response) {
                if (response.flag) {
                    let data = response.data;
                    data.forEach(function (v, i) {
                        aptOptions += `<option value="${v.id}">${v.apartment_name}</option>`;
                    });
                }
            }
        });
        societyID = society_id;
    }
    $(ele_id).html(aptOptions).trigger('change');
}

async function getAddressRemarks(society_id, area_id, ele_id) {
    if (society_id != societyID) {
        cityOptions = '<option value=""></option>';
        $.ajax({
            type: 'get',
            url: `/panel/common-data/get-address-remarks/${society_id}/${area_id}`,
            dataType: 'json',
            async: false,
            success: function (response) {
                var opt = '';
                if (response.flag) {
                    response.data.forEach(function (v, i) {
                        opt += `<option value="${v.id}">${v.remark}</option>`;
                    });
                    $(ele_id).append(opt).trigger('change');
                }
            }
        });
        societyID = society_id;
    }
    $(ele_id).html(cityOptions).trigger('change');
}

async function getDonationCollectors(ele_id) {
    $.ajax({
        type: 'get',
        url: '/panel/common-data/get-donation-collectors',
        dataType: 'json',
        async: false,
        success: function (response) {
            if (response.flag) {
                var opt = '';
                response.data.forEach(function (v, i) {
                    opt += `<option value="${v.id}">${v.name}</option>`;
                });
                $(ele_id).append(opt).trigger('change');
            }
        }
    });
}

function clearValidation(form_id) {
    $(form_id)[0].reset();
    $(form_id).find('.select2').val('').trigger('change');
    $('em.error').hide();
    $(form_id).find('input, select, .select2').removeClass('error').removeClass('invalid');
}

$('.select2').select2({
    placeholder: '--- Select ---',
    // dropdownParent: $('#donationBoxModal')
});

$(document).on('click', '.reset-form-btn', function (e) {
    let form = $(this).closest('form');
    form.find('.select2').val('').trigger('change');
    $('em.error').hide();
    form.find('input, select, .select2').removeClass('error').removeClass('invalid');
});
