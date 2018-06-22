<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_media
 *
 * @copyright   Copyright (C) 2005 - 2018 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

namespace Joomla\Component\Media\Administrator\AdaptiveImage;

defined('_JEXEC') or die;

/**
 * Used for cropping of the images around
 * the focus points.
 *
 * @since  4.0.0
 */
class SmartCrop
{
    // Path of the image
    public $imgSrc;
    // Data focus points
    public $dataFocus;
    // Directory for storeing cache
    public $cacheDir;
    //Resized Image;
    private $imageResized;
    /**
     * Set the requested image path.
     * 
     * @param  string  $imgSrc     Path of the image
     * @param  array   $dataFocus  Focus points
     * 
     * @since 4.0.0
     */    
    public function __constructor($imgSrc, $dataFocus)
    {
        $this->imgSrc = $imgSrc;
        $this->dataFocus = $dataFocus;
    }

    /**
     * Resize and crop the image
     * 
     * @return  boolean
     * 
     * @since 4.0.0
     */
    public function cropImage()
    {

    }
    /**
     * For finding the optimum dimention for cropping
     * 
     * @param  array  $dataFocus    Dimention of the Focus area
     * @param  int    $finalWidth   Width of requested image
     * @param  int    $finalHeight  Height of requested image
     * @param  float  $imgWidth     Width of original image
     * @param  float  $imgHeight    Height of the original image
     * 
     * @return  array
     * 
     * @since 4.0.0
     */
    public function getOptimumDimentions($dataFocus, $finalWidth, $finalHeight, $imgWidth, $imgHeight)
    {
        $finalDimentions = array();
        $fx1 = $dataFocus['data-focus-left'];
        $fy1 = $dataFocus['data-focus-top'];
        $fx2 = $dataFocus['data-focus-right'];
        $fy2 = $dataFocus['data-focus-bottom'];
        if ($imgWidth/$imgHeight > $finalWidth/$finalWidth)
        {
            $fwidth = ( $fx2 - $fx1 ) * $imgWidth;
            if ($fwidth/$imgHeight > $finalWidth/$finalHeight)
            {
                $finalDimentions['height'] = $imgHeight * $finalWidth/$finalHeight;
                $finalDimentions['width']  = $imgWidth  * $finalWidth/$finalHeight;
                $finalDimentions['x']      = (-1) * $fx1 * $finalDimentions['width'];
                $finalDimentions['y']      = ($finalHeight - $finalDimentions['height']) / 2;
            }
            else
            {
                $finalDimentions['height'] = $finalHeight;
                $finalDimentions['width']  = $finalHeight * $imgWidth / $imgHeight;
                $finalDimentions['x']      = $finalWidth / 2 - ( $fx1 - $fx2 ) * $finalDimentions['width'] / 2;
                $finalDimentions['y']      = 0;
            }
        }
        else
        {
            $fheight = ( $fy2 - $fy1 ) * $imgHeight;
            if ($fheight/$imgWidth > $finalWidth/$finalHeight)
            {
                $finalDimentions['height'] = $imgHeight * $finalHeight / $fheight;
                $finalDimentions['width']  = $imgWidth * $finalHeight / $fheight;
                $finalDimentions['x']      = ($finalWidth - $finalDimentions['width']) / 2;
                $finalDimentions['y']      = (-1) * $fy1 * $finalDimentions['height'];
            }
            else
            {
                $finalDimentions['height'] = $finalWidth * $imgHeight / $imgWidth;
                $finalDimentions['width']  = $finalWidth;
                $finalDimentions['x']      = 0;
                $finalDimentions['y']      = $finalHeight / 2 - ($fy1 + $fy2) * $finalDimentions['height'] / 2;
            }
        }
        return $finalDimentions;
    }
    /**
     * Save the image to the directory.
     */
    public function saveImage()
    {

    }
    /**
     * Check if cache directory is present or not
     */
    public function checkDir()
    {
        
    }
}
