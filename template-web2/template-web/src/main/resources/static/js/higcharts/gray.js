/**
 * Gray theme for Highcharts JS
 * @author Torstein Honsi
 */

Highcharts.theme = {
	colors: ["#6A8DA7", "#E5603B", "#EAC85E", "#56BC76", "#ef80ae","#66FFFF"],
        //colors: ["#5698C3", "#E74C3C", "#F1C40F", "#2ECC71"],
	chart: {
		  backgroundColor:'rgba(255, 255, 255, 0)',
		borderWidth: 0,
		borderRadius: 15,
		plotBackgroundColor: null,
		plotShadow: false,
		plotBorderWidth: 0
	}
};

// Apply the theme
var highchartsOptions = Highcharts.setOptions(Highcharts.theme);
