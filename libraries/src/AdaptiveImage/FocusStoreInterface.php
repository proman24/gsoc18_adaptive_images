<?php
/**
 * @package     Joomla
 * @subpackage  com_media
 *
 * @copyright   Copyright (C) 2005 - 2018 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

namespace Joomla\CMS\AdaptiveImage;

defined('_JEXEC') or die;

/**
 * Focus Store Interface.
 *
 * @since  4.0.0
 */
interface FocusStoreInterface
{
	/**
	 * Pubic function for storeing the focus points
	 * to the file system.
	 *
	 * @param   array    $dataFocus  Focus point selected
	 * @param   integer  $width      Width of the image
	 * @param   string   $imgSrc     Path of the image
	 *
	 * @return void
	 *
	 * @since 4.0.0
	 */
	public function setFocus($dataFocus, $width, $imgSrc);

	/**
	 * Public function for getting the focus point
	 * from the file system
	 *
	 * @param   string   $imgSrc  Path of the image
	 * @param   integer  $width   Width of the image
	 * 
	 * @return string
	 *
	 * @since 4.0.0
	 */
	public function getFocus($imgSrc, $width);

	/**
	 * Function for removeing the focus points for all widths
	 * 
	 * @param   string  $imgSrc  Path of the image
	 * 
	 * @return  boolean
	 * 
	 * @since 4.0.0
	 */
	public function deleteFocus($imgSrc);

	/**
	 * Function for removeing all the associated resized images
	 * 
	 * @param   string  $imgSrc  Path of the image
	 * 
	 * @return  boolean
	 * 
	 * @since 4.0.0
	 */
	public function deleteResizedImages($imgSrc);

}
