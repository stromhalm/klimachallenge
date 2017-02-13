klimaChallenge.filter('imageResizer', imageResizer);

function imageResizer($filter){
    return function (value, convertOptions) {

		 // Image from Filepicker?
		 if (value.lastIndexOf("https://cdn.filepicker.io", 0) === 0) {
			 return $filter('fpConvert')(value, convertOptions);
		 }

		 // Else make no changes to URL
		 return value;
    };
}
