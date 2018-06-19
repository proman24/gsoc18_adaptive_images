/**
 * @copyright  Copyright (C) 2005 - 2018 Open Source Matters, Inc. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 */
Joomla = window.Joomla || {};

Joomla.MediaManager = Joomla.MediaManager || {};
Joomla.MediaManager.Edit = Joomla.MediaManager.Edit || {};

(function () {
	"use strict";
    var initSmartCrop = function (mediaData) {
		var image = document.getElementById('image-preview');
		
		// Initiate the cropper for gathering the focus point
		Joomla.MediaManager.Edit.smartcrop.cropper = new Cropper(image, { 
			viewMode: 1,
			responsive: false,
			restore: true,
			autoCrop: true,
			movable: true,
			zoomable: false,
			rotatable: false,
			autoCropArea: 0,
			minContainerWidth: image.offsetWidth,
			minContainerHeight: image.offsetHeight,
			crop: function (e) {
				var left, top,
					canvas_width, canvas_height,
					image_width, image_height;

				left = Math.round(e.detail.x);
				top = Math.round(e.detail.y);
				canvas_width = Math.round(e.detail.width);
				canvas_height = Math.round(e.detail.height);

				image_width = image.naturalWidth;
				image_height = image.naturalHeight;

				// Top, Bottom, Left, right are the data focus points
                Joomla.MediaManager.Edit.smartcrop.cropper.top = (top / image_height).toFixed(2);
                Joomla.MediaManager.Edit.smartcrop.cropper.bottom = ((canvas_height + top) / image_height).toFixed(2);
                Joomla.MediaManager.Edit.smartcrop.cropper.left = (left / image_width).toFixed(2);
				Joomla.MediaManager.Edit.smartcrop.cropper.right = ((canvas_width + left) / image_width).toFixed(2);
				 
				// Setting the computed focus point into the input fields
				document.getElementById('jform_data_focus_top').value = Joomla.MediaManager.Edit.smartcrop.cropper.top;
				document.getElementById('jform_data_focus_bottom').value = Joomla.MediaManager.Edit.smartcrop.cropper.bottom;
				document.getElementById('jform_data_focus_left').value = Joomla.MediaManager.Edit.smartcrop.cropper.left;
				document.getElementById('jform_data_focus_right').value = Joomla.MediaManager.Edit.smartcrop.cropper.right;

				// Manageing image extension 
				var format = Joomla.MediaManager.Edit.original.extension === 'jpg' ? 'jpeg' : Joomla.MediaManager.Edit.original.extension;

				// Takeing the value of the quality
				var quality = document.getElementById('jform_crop_quality').value;

				// Notify the app that a change has been made
				window.dispatchEvent(new Event('mediaManager.history.point'));
			}
		});
		Joomla.MediaManager.Edit.smartcrop.cropper.setCropBoxData( {"left":0,"top":0,"width":100,"height":100})
    }

    // Register the Events
	Joomla.MediaManager.Edit.smartcrop = {
		Activate: function (mediaData) {
			// Initialize
			initSmartCrop(mediaData);
		},
		Deactivate: function () {
			var path = getQueryVariable('path');
			path = path.split(':');
			path = '/images' + path[1];
			var data = "&data-focus-top="+Joomla.MediaManager.Edit.smartcrop.cropper.top+
					"&data-focus-left="+Joomla.MediaManager.Edit.smartcrop.cropper.left+
					"&data-focus-bottom="+Joomla.MediaManager.Edit.smartcrop.cropper.bottom+
					"&data-focus-right="+Joomla.MediaManager.Edit.smartcrop.cropper.right;
			var xhr = new XMLHttpRequest();
			var url = resolveBaseUrl() +"/administrator/index.php?option=com_media&task=adaptiveimage.setfocus&path="+path;
			url += data;
			xhr.open("GET", url, true);
			xhr.send();
            if (!Joomla.MediaManager.Edit.smartcrop.cropper) {
				return;
			}
			// Destroy the instance
			Joomla.MediaManager.Edit.smartcrop.cropper.destroy();
		}
	};

	function getQueryVariable(variable) {
		var query = window.location.search.substring(1);
		var vars = query.split('&');
		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split('=');
			if (decodeURIComponent(pair[0]) == variable) {
				return decodeURIComponent(pair[1]);
			}
		}
		return false;
	};

	function resolveBaseUrl() {
		var basePath = window.location.origin;
		var url = window.location.pathname.split('/');
		if (url[1]!='administrator') {
			return basePath+"/"+url[1];
		}
		return basePath;
	}

})();