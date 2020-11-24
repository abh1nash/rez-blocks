<?php
/**
 * Plugin Name: REZ Blocks
 * Plugin URI: http://abhinash.net/
 * Version: 1.0.0.2
 * Description: Custom blocks for REZ
 * Author: Abhinash Khatiwada
 * Author URI: https://abhinash.net/
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 * GitHub Plugin URI: https://github.com/abh1nash/rez-blocks
 *
 * @package REZ
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
