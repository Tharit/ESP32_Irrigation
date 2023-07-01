// set hostname used for MQTT tag and WiFi
#define HOSTNAME "ESPIrrigation"
#define VERSION "v 1.0.0"

#define BASELINE_INTERVAL 3600000
#define MQTT_INTERVAL 120000
#define RECONNECT_INTERVAL 5000
#define PUBLISH_DELAY 5000
#define LED_BLINK_INTERVAL 500
#define RELAY_RESET_INTERVAL 5000
#define MODBUS_INTERVAL 10000

//-------------------------------------------------------------------
#define GPIO_LED 2

// Set number of outputs
#define NUM_OUTPUTS 1

// Assign each GPIO to an output
int outputGPIOs[NUM_OUTPUTS] = {5};

#define SERIAL2_TX 17
#define SERIAL2_RX 16

//-------------------------------------------------------------------
