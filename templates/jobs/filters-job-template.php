<?php
global $jobsearch_plugin_options;
$output = '';
$left_filter_count_switch = 'no';

$sh_atts = isset($job_arg['atts']) ? $job_arg['atts'] : '';

$job_feat_jobs_top = isset($sh_atts['job_feat_jobs_top']) ? $sh_atts['job_feat_jobs_top'] : '';
$job_feats_only = isset($sh_atts['featured_only']) ? $sh_atts['featured_only'] : '';

if (isset($args_count['meta_query']) && $job_feat_jobs_top == 'yes' && $job_feats_only != 'yes') {
    $cou_args_mqury = $args_count['meta_query'];
    $cou_args_mqury = jobsearch_remove_exfeatkeys_jobs_query($cou_args_mqury);
    $args_count['meta_query'] = $cou_args_mqury;
}

$job_types_switch = isset($jobsearch_plugin_options['job_types_switch']) ? $jobsearch_plugin_options['job_types_switch'] : '';

$filters_op_sort = isset($jobsearch_plugin_options['jobs_srch_filtrs_sort']) ? $jobsearch_plugin_options['jobs_srch_filtrs_sort'] : '';

$filters_op_sort = isset($filters_op_sort['fields']) ? $filters_op_sort['fields'] : '';
?>
<div class="jobsearch-column-3 jobsearch-typo-wrap">
    <?php
    if (isset($sh_atts['job_filters_count']) && $sh_atts['job_filters_count'] == 'yes') {
        $left_filter_count_switch = 'yes';
    }
    do_action('jobsearch_jobs_listing_filters_before', array('sh_atts' => $sh_atts));

    if (isset($filters_op_sort['date_posted'])) {
        foreach ($filters_op_sort as $filter_sort_key => $filter_sort_val) {
            if ($filter_sort_key == 'date_posted') {
                $output .= apply_filters('jobsearch_job_filter_date_posted_box_html', '', $global_rand_id, $args_count, $left_filter_count_switch, $sh_atts);
            } else if ($filter_sort_key == 'location') {
                $output .= apply_filters('jobsearch_job_filter_joblocation_box_html', '', $global_rand_id, $args_count, $left_filter_count_switch, $sh_atts);
            } else if ($filter_sort_key == 'sector') {
                $output .= apply_filters('jobsearch_job_filter_sector_box_html', '', $global_rand_id, $args_count, $left_filter_count_switch, $sh_atts);
            } else if ($filter_sort_key == 'job_type') {
                if ($job_types_switch == 'on') {
                    $output .= apply_filters('jobsearch_job_filter_jobtype_box_html', '', $global_rand_id, $args_count, $left_filter_count_switch, $sh_atts);
                }
            } else if ($filter_sort_key == 'custom_fields') {
                $output .= apply_filters('jobsearch_custom_fields_filter_box_html', '', 'job', $global_rand_id, $args_count, $left_filter_count_switch, 'jobsearch_job_content_load');
            }
        }
    } else {
        /*
         * add filter box for job locations filter 
         */
        $output .= apply_filters('jobsearch_job_filter_joblocation_box_html', '', $global_rand_id, $args_count, $left_filter_count_switch, $sh_atts);
        /*
         * add filter box for date posted filter 
         */
        $output .= apply_filters('jobsearch_job_filter_date_posted_box_html', '', $global_rand_id, $args_count, $left_filter_count_switch, $sh_atts);

        /*
         * add filter box for job types filter 
         */
        if ($job_types_switch == 'on') {
            $output .= apply_filters('jobsearch_job_filter_jobtype_box_html', '', $global_rand_id, $args_count, $left_filter_count_switch, $sh_atts);
        }
        /*
         * add filter box for sectors filter 
         */
        $output .= apply_filters('jobsearch_job_filter_sector_box_html', '', $global_rand_id, $args_count, $left_filter_count_switch, $sh_atts);
        /*
         * add filter box for custom fields filter 
         */
        $output .= apply_filters('jobsearch_custom_fields_filter_box_html', '', 'job', $global_rand_id, $args_count, $left_filter_count_switch, 'jobsearch_job_content_load');
    }
    
    echo force_balance_tags($output);
    ?>
</div>
