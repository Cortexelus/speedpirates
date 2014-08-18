
var Jazz = document.getElementById("Jazz2");
function playMidiTest(){
 if(Jazz.isJazz){

  Jazz.MidiOut(0xb0,02,100);
  Jazz.MidiOut(0x90,60,100);
  Jazz.MidiOut(0x90,64,100);
  Jazz.MidiOut(0x90,67,100);
 }
}
function stopMidiTest(){
 if(Jazz.isJazz){
  Jazz.MidiOut(0xb0,02,0);
  Jazz.MidiOut(0x80,60,0);
  Jazz.MidiOut(0x80,64,0);
  Jazz.MidiOut(0x80,67,0);
 }
}

var enableMidi = true
var globalForeverLoops = 32;
// r g b are values 0 to 127
function midiColor(r, g, b){
  if(Jazz.isJazz && enableMidi){
      Jazz.MidiOut(0xb0,02,r);
      Jazz.MidiOut(0xb0,03,g);
      Jazz.MidiOut(0xb0,04,b);
  }
}

function newMidiMessage(t,a,b,c){
  //msg.innerHTML=msg.innerHTML+midiString(a,b,c)+"<br>";
  //msg.scrollTop=msg.scrollHeight;
  if(b==0 && c==0){
    return;
  }
  if(a==153){ // drum pad
    if(b>=31 && b<=55){
      // 49 51 55
      // 41 48 45
      // 32 31 39
      // 33 43 34 
      if(c>0){
        // trigger
        var k = 0;

        // top row
        if(b == 49) k = 81;
        if(b == 55) k = 65;
        if(b == 51) k = 90;

        // mid row
        if(b == 41) k = 87;
        if(b == 45) k = 83;
        if(b == 48) k = 88;

        // 2nd mid row
        if(b == 32) k = 69;
        if(b == 31) k = 68;
        if(b == 39) k = 67;

        // bottom row
        /* if(b == 33) k = 82;
        if(b == 34) k = 70;
        if(b == 43) k = 86;
  */
        if(b == 33 || b == 34 || b == 43){
          song.stop_audio();
          return;
        }


        // kick
        if(b == 38) k = 80;

        // snare
        if(b == 35) k = 75  ; //rim
        if(b == 36) k = 76;

        // tom
        //if(b == 45) k = 78;
        if(b == 46) k = 77;

        if(k) triggerKey(k, false)
      }
    }
  }
  console.log("newMIdi", t, a, b, c)
  /*if(a==144){ //note on
    if(b>=24 || b<=108){
      // NOTE
      // 24 -> 32.703
      // 108 -> 4186
      // fm  =  2(m−69)/12(440 Hz).
      fr = 440 * Math.pow(2, (b - 69)/12);
      bpm = fr * 60 / 32;
      console.log(b, fr, bpm)
      song.tempo = bpm
      song.replay_loop();
    }
  }*/

}
// Connect/disconnect
function connectMidiIn(){
 try{
  var str=Jazz.MidiInOpen(input_midi_device,newMidiMessage);
  for(var i=0;i<sel.length;i++){
   if(selectinmidi[i].value==str)  selectinmidi[i].selected=1;
  }
 }
 catch(err){}
}

function disconnectMidiIn(){
 try{
  Jazz.MidiInClose(); selectinmidi[0].selected=1;
 }
 catch(err){}
}


if(navigator.appName=='Microsoft Internet Explorer'){ document.onfocusin=onFocusIE; document.onfocusout=onBlurIE;}
else{ window.onfocus=connectMidiIn; window.onblur=disconnectMidiIn;}






var input_midi_device = null;

function changeoutmidi(){
 Jazz.MidiOutOpen(selectoutmidi.options[selectoutmidi.selectedIndex].value);
}
function changeinmidi(){
  input_midi_device = selectinmidi.options[selectinmidi.selectedIndex].value
 Jazz.MidiInOpen(input_midi_device, newMidiMessage);
}

var selectinmidi=document.getElementById('selectinmidi');
var selectoutmidi=document.getElementById('selectoutmidi');
function midiList(max_tries){
  var timeout = 1000;
  try{
   var list=Jazz.MidiOutList();
   for(var i in list){
    selectoutmidi[i]=new Option(list[i],list[i],i==0,i==0);
    // automatically select "elec man"
    if(list[i]=="Elec Man"){
      Jazz.MidiOutOpen(i);
      selectoutmidi[i].selected=1;
    }

   }

   var list=Jazz.MidiInList();
   for(var i in list){
    selectinmidi[i]=new Option(list[i],list[i],i==0,i==0);

    if(list[i]=="Port1"){
      Jazz.MidiInOpen(i, newMidiMessage);
      selectinmidi[i].selected=1;
      input_midi_device = i;
    }

   }
  }
  catch(err){
    console.log("blah", err)
    if(max_tries > 0){
      console.log("trying again in " + timeout);
      setTimeout(function(){midiList( max_tries - 1)}, timeout);
    }
  }
}
midiList(5)