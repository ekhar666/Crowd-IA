jQuery(document).ready(function ($) {

    // demo login
    $(document).on('click', '.jobsearch-demo-login-btn', function () {
        var _this = jQuery(this);

        var user_type = 'candidate';
        var icon_class = 'jobsearch-icon jobsearch-user';
        if (_this.hasClass('employer-login-btn')) {
            user_type = 'employer';
            icon_class = 'jobsearch-icon jobsearch-building';
        }

        _this.find('i').attr('class', 'fa fa-refresh fa-spin');

        var request = $.ajax({
            url: jobsearch_login_register_common_vars.ajax_url,
            method: "POST",
            data: {
                'user_type': user_type,
                'action': 'jobsearch_demo_user_login',
            },
            dataType: "json"
        });
        request.done(function (response) {
            if (typeof response.redirect !== 'undefined') {
                window.location.href = response.redirect;
                return false;
            }
            window.location.reload(true);
        });

        request.fail(function (jqXHR, textStatus) {
            _this.find('i').attr('class', icon_class);
        });
    });

    // Post login form
    $(document).on('click', '.jobsearch-login-submit-btn', function (e) {
        e.preventDefault();
        var _this = $(this),
                this_id = $(this).data('id'),
                login_form = $('#login-form-' + this_id),
                msg_con = login_form.find('.login-reg-errors'),
                loader_con = login_form.find('.form-loader');
        var button = $(this).find('button');
        var btn_html = button.html();
        msg_con.hide();
        _this.addClass('disabled-btn');
        _this.attr('disabled', 'disabled');
        //button.html('loading');
        loader_con.show();
        loader_con.html('<i class="fa fa-refresh fa-spin"></i>');
        $.post(jobsearch_login_register_common_vars.ajax_url, login_form.serialize(), function (data) {

            var obj = $.parseJSON(data);
            msg_con.html(obj.message);

            loader_con.hide();
            loader_con.html('');
            _this.removeClass('disabled-btn');
            _this.removeAttr('disabled');
            msg_con.slideDown('slow');
            if (obj.error == false) {
                // $('#pt-user-modal .modal-dialog').addClass('loading');
                //window.location.reload(true);
                if (typeof obj.redirect !== 'undefined') {
                    window.location.href = obj.redirect;
                }
                button.hide();
            }

            button.html(btn_html);
        });
    });
    // end login post

    // Reset Password
    // Switch forms login/register
    $(document).on('click', '.lost-password', function (e) {
        e.preventDefault();
        var this_id = $(this).data('id');
        $('.login-form-' + this_id).slideUp();
        $('.reset-password-' + this_id).slideDown();
    });
    $(document).on('click', '.login-form-btn', function (e) {
        e.preventDefault();
        var this_id = $(this).data('id');
        $('.login-form-' + this_id).slideDown();
        $('.reset-password-' + this_id).slideUp();
    });
    $(document).on('click', '.register-form', function (e) {
        e.preventDefault();
        var login_form = jQuery('#JobSearchModalLogin').find('form[id^="login-form-"]');
        var rgistr_form = jQuery('#JobSearchModalLogin').find('form[id^="registration-form-"]');
        var this_id = $(this).data('id');
        $('.reset-password-' + this_id).slideUp();
        $('.register-' + this_id).slideDown();
        $('.login-form-' + this_id).slideUp();
        
        // for redirect url
        var redrct_hiden_field = login_form.find('input[name="jobsearch_wredirct_url"]');
        if (redrct_hiden_field.length > 0) {
            var redrct_hiden_val = redrct_hiden_field.val();
            rgistr_form.append('<input type="hidden" name="jobsearch_wredirct_url" value="' + redrct_hiden_val + '">');
            redrct_hiden_field.remove();
        }

        // for packages
        var pkginfo_hiden_field = login_form.find('input[name="extra_login_params"]');
        if (pkginfo_hiden_field.length > 0) {
            var pkginfo_hiden_val = pkginfo_hiden_field.val();
            rgistr_form.append('<input type="hidden" name="extra_login_params" value="' + pkginfo_hiden_val + '">');
            pkginfo_hiden_field.remove();
        }
    });
    $(document).on('click', '.reg-tologin-btn', function (e) {
        e.preventDefault();
        var login_form = jQuery('#JobSearchModalLogin').find('form[id^="login-form-"]');
        var rgistr_form = jQuery('#JobSearchModalLogin').find('form[id^="registration-form-"]');
        var this_id = $(this).data('id');
        $('.reset-password-' + this_id).slideUp();
        $('.register-' + this_id).slideUp();
        $('.login-form-' + this_id).slideDown();
        
        // for redirect url
        var redrct_hiden_field = rgistr_form.find('input[name="jobsearch_wredirct_url"]');
        if (redrct_hiden_field.length > 0) {
            var redrct_hiden_val = redrct_hiden_field.val();
            login_form.append('<input type="hidden" name="jobsearch_wredirct_url" value="' + redrct_hiden_val + '">');
            redrct_hiden_field.remove();
        }

        // for packages
        var pkginfo_hiden_field = rgistr_form.find('input[name="extra_login_params"]');
        if (pkginfo_hiden_field.length > 0) {
            var pkginfo_hiden_val = pkginfo_hiden_field.val();
            login_form.append('<input type="hidden" name="extra_login_params" value="' + pkginfo_hiden_val + '">');
            pkginfo_hiden_field.remove();
        }
    });

    $(document).on('click', '.user-type-chose-btn', function () {
        var this_type = $(this).attr('data-type');
        if (this_type == 'jobsearch_employer') {
            $('.user-employer-spec-field').slideDown();
            $('.employer-cus-field').slideDown();
            $('.candidate-cus-field').slideUp();
            $('.jobsearch-register-form').find('.jobsearch-box-title-sub').slideUp();
            $('.jobsearch-register-form').find('.jobsearch-login-media').slideUp();
        } else {
            $('.user-employer-spec-field').slideUp();
            $('.employer-cus-field').slideUp();
            $('.candidate-cus-field').slideDown();
            $('.jobsearch-register-form').find('.jobsearch-box-title-sub').slideDown();
            $('.jobsearch-register-form').find('.jobsearch-login-media').slideDown();
        }
        $(this).parents('.jobsearch-user-type-choose').find('li').removeClass('active');
        $(this).parent('li').addClass('active');
        $(this).parents('form').find('input[name="pt_user_role"]').val(this_type);
    });

    $(document).on('change', 'input[type="radio"][name="pt_user_role"]', function () {
        if ($(this).val() == 'jobsearch_employer') {
            $('.user-employer-spec-field').slideDown();
            $('.employer-cus-field').slideDown();
            $('.candidate-cus-field').slideUp();
        } else {
            $('.user-employer-spec-field').slideUp();
            $('.employer-cus-field').slideUp();
            $('.candidate-cus-field').slideDown();
        }
    });

    $(document).on('click', '.jobsearch-reset-password-submit-btn', function (e) {
        e.preventDefault();
        var _this = $(this),
                this_id = $(this).data('id'),
                reset_password_form = $('#reset-password-form-' + this_id),
                msg_con = reset_password_form.find('.reset-password-errors'),
                loader_con = reset_password_form.find('.form-loader');
        var button = $(this).find('button');
        var btn_html = button.html();
        //button.html('loading');
        msg_con.hide();
        _this.addClass('disabled-btn');
        _this.attr('disabled', 'disabled');
        loader_con.show();
        loader_con.html('<i class="fa fa-refresh fa-spin"></i>');
        $.post(jobsearch_login_register_common_vars.ajax_url, reset_password_form.serialize(), function (data) {

            var obj = $.parseJSON(data);
            msg_con.html(obj.message);
            // if(obj.error == false){
            // $('#pt-user-modal .modal-dialog').addClass('loading');
            // $('#pt-user-modal').modal('hide');
            // }

            msg_con.slideDown('slow');

            _this.removeClass('disabled-btn');
            _this.removeAttr('disabled');

            loader_con.hide();
            loader_con.html('');

            button.html(btn_html);
        });
    });
    // end reset password

    // Post register form


    $(document).on('click', '.jobsearch-register-submit-btn', function (e) {
        e.preventDefault();
        var _this = $(this),
                this_id = $(this).data('id'),
                registration_form = $('#registration-form-' + this_id),
                msg_con = registration_form.find('.registration-errors'),
                loader_con = registration_form.find('.form-loader');

        var get_terr_val = jobsearch_accept_terms_cond_pop(registration_form);
        if (get_terr_val != 'yes') {
            return false;
        }

        var button = $(this).find('button');
        var btn_html = button.html();
        //button.html('loading');
        msg_con.hide();
        _this.addClass('disabled-btn');
        _this.attr('disabled', 'disabled');
        loader_con.show();
        loader_con.html('<i class="fa fa-refresh fa-spin"></i>');
        $.post(jobsearch_login_register_common_vars.ajax_url, registration_form.serialize(), function (data) {

            var obj = $.parseJSON(data);
            msg_con.html(obj.message);

            msg_con.slideDown('slow');
            button.html(btn_html);

            _this.removeClass('disabled-btn');
            _this.removeAttr('disabled');

            if (typeof obj.error !== 'undefined' && obj.error == true) {
                loader_con.hide();
                loader_con.html('');
            }
            if (typeof obj.redirect !== 'undefined') {
                window.location.href = obj.redirect;
            } else {
                loader_con.html('');
            }
        });
    });
});

jQuery(document).on('click', '.user-passreset-submit-btn', function (e) {
    e.preventDefault();
    var _this = jQuery(this);
    var _user_id = _this.attr('data-id');
    var _user_key = _this.attr('data-key');

    var this_form = _this.parents('form');
    var this_loader = this_form.find('.loader-box');
    var this_msg_con = this_form.find('.message-box');

    var new_pass = this_form.find('input[name="new_pass"]');
    var conf_pass = this_form.find('input[name="conf_pass"]');

    var error = 0;
    if (new_pass.val() == '') {
        error = 1;
        new_pass.css({"border": "1px solid #ff0000"});
    } else {
        new_pass.css({"border": "1px solid #d3dade"});
    }
    if (conf_pass.val() == '') {
        error = 1;
        conf_pass.css({"border": "1px solid #ff0000"});
    } else {
        conf_pass.css({"border": "1px solid #d3dade"});
    }

    if (error == 0) {

        this_msg_con.hide();
        this_loader.html('<i class="fa fa-refresh fa-spin"></i>');
        var request = jQuery.ajax({
            url: jobsearch_plugin_vars.ajax_url,
            method: "POST",
            data: {
                user_id: _user_id,
                user_key: _user_key,
                new_pass: new_pass.val(),
                conf_pass: conf_pass.val(),
                action: 'jobsearch_pass_reseting_by_redirect_url',
            },
            dataType: "json"
        });

        request.done(function (response) {
            var msg_before = '';
            var msg_after = '';
            if (typeof response.error !== 'undefined') {
                if (response.error == '1') {
                    msg_before = '<div class="alert alert-danger"><i class="fa fa-times"></i> ';
                    msg_after = '</div>';
                } else if (response.error == '0') {
                    msg_before = '<div class="alert alert-success"><i class="fa fa-check"></i> ';
                    msg_after = '</div>';
                }
            }
            if (typeof response.msg !== 'undefined') {
                this_msg_con.html(msg_before + response.msg + msg_after);
                this_msg_con.slideDown();
                if (typeof response.error !== 'undefined' && response.error == '0') {
                    new_pass.val('');
                    conf_pass.val('');
                    this_form.find('ul.email-fields-list').slideUp();
                }
            } else {
                this_msg_con.html(jobsearch_plugin_vars.error_msg);
            }
            this_loader.html('');

        });

        request.fail(function (jqXHR, textStatus) {
            this_loader.html(jobsearch_plugin_vars.error_msg);
        });
    }
});