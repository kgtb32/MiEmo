#include <Servo.h>
#define BUTTON_PIN 10
Servo screenLeft;
Servo screenRight;
bool borneStatus;

void setup() {
  Serial.begin(9600);
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  screenLeft.attach(2);
  screenRight.attach(3);
  screenLeft.write(0);
  screenRight.write(0);
  borneStatus = 1;
  Serial.println(borneStatus);

}

void loop() {
  
  if (digitalRead(BUTTON_PIN) == 0){
    delay(100);
    Serial.println("here");
    Serial.println(borneStatus);
    if(borneStatus == 1){
      delay(100);
      MirroirFunction();
    } else{
      delay(100);
      BorneFunction();
    }
  }

}

void  BorneFunction(){
  Serial.println("cool");
  screenLeft.write(0);
  screenRight.write(0);
  borneStatus = 1;
  Serial.println(borneStatus);
      delay(100);


} 

void  MirroirFunction(){
  Serial.print("TAAA");
  screenLeft.write(180);
  screenRight.write(180);
  borneStatus = 0;
  Serial.println(borneStatus);
      delay(100);

} 
