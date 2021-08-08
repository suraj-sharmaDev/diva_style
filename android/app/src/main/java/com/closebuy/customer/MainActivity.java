package com.closebuy.customer;

import com.facebook.react.ReactActivity;

// import org.devio.rn.splashscreen.SplashScreen; // Import this.
import com.zoontek.rnbootsplash.RNBootSplash; // <- add this necessary import
import android.os.Bundle; // Import this.

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    // Add this method.
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        RNBootSplash.init(R.drawable.background_splash, MainActivity.this); // <- display the generated bootsplash.xml drawable over our MainActivity
        super.onCreate(savedInstanceState);
    }
        
    @Override
    protected String getMainComponentName() {
        return "CloseBuy";
    }
}
