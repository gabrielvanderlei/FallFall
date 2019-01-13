var rect = 0;
var i = 0;
var time = 1300;
var playing = false;
var animation;
var score = 0;
var changing = 0;
var rotateSd = 0;
var leftRandom = 0;
var velocity = 100;
var difficult = 0;
var verify = 0;

document.addEventListener("deviceready", onDeviceReady, true);
      alert('Deviceready configurados.');

function onDeviceReady() {
    document.removeEventListener('deviceready', onDeviceReady, true);
      alert('Anúncios configurados.');
    
      // Set AdMobAds options:
    admob.setOptions({
      publisherId:          "NONE",                                    // Replace with your AdMob id (if you don't have any, set it to "NONE")
      tappxIdiOS:           "NONE",            // Replace with your Tappx Id for iOS
      tappxIdAndroid:       "pub-45642-android-4249",        // Replace with your Tappx Id for Android
      tappxShare:           1                                          // Do not use lower tappxShare ratio if you have set publixherId to "NONE"
    });

    // Start showing banners (will show atomatically as autoShowBanner is set to true by default)
    admob.createBannerView();

    // Request interstitial (will present automatically as autoShowInterstitial is set to true by default)
    admob.requestInterstitial();
  }
  