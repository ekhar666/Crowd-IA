<?php
/**
 * The template for displaying all single posts.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 */
global $post, $jobsearch_plugin_options;
$employer_id = $post->ID;

jobsearch_employer_views_count($employer_id);
get_header();

$employer_view = isset($jobsearch_plugin_options['jobsearch_emp_detail_views']) && !empty($jobsearch_plugin_options['jobsearch_emp_detail_views']) ? $jobsearch_plugin_options['jobsearch_emp_detail_views'] : 'view1';

$employer_view = apply_filters('careerfy_emp_detail_page_style_display',$employer_view,$employer_id);

jobsearch_get_template_part($employer_view, 'employer', 'detail-pages/employer');

get_footer();
