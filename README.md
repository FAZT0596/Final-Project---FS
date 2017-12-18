FINAL PROJECT - FOTIS SIERRA

For my Final Project I wanted to create a sequencer of some sort. At first I thought of coding a drum sequencer, but 
in order to keep file sourcing easier, I ended up creating a synth sequencer, which plays an oscillated signal 
rather than a pre-recorded audio sample. In any of the cases, the logic behind triggering the events remains the 
same, which was my ultimate goal to achieve. 
	
As far as the API goes, I was lucky to find that the WEB AUDIO API is already included in almost all browsers, 
making it the standard for audio management, replacing the audio format from HTML, which would cause latency issues. 
Because of this, everything was pretty much installed and ready to be used, it was just a matter of me creating the 
Class that would handle all the audio events, as well as making the proper connections to trigger the events 
correctly. 

SPECS
Monophonic Polyphony (1 voice)
8 Tracks
16 Steps
WaverForm Selector [Sawtooth, Square]
Insert Effect [LowPass Filter]
ByPass Function For Insert Effect
Volume Fader [One Per Track]
Transport Buttons [Play, Stop]
Clear Button [Clears Sequence Events]
Time Interval Display [Current Step]
Visual Playhead [White Means Current Step]
Volume Fader Value Display [Default: 0.8]
Oscillator Frequency Value Display [Click TRACK Button To Display]

Besides from the core functionality, I also included some “eye candy”. A good example is adjusting the scale of all 
the button objects when pressed. As you’ll see, they shrink when pressed, and return to normal when released. I 
always like adding small details like this, which in return give more life to the program. 

TO-DO
Re-Write JS As jQuery Code
Re-Factor Code
Make Sequencer Polyphonic [By Adding Additional Oscillators]
Add More Insert Effects {Delay, Reverb], Distortion
Add Custom WaveForm To WaveForm Selector
Display WaveForm In Spectrum Analyzer 
Add Custom Sequence Events [Presets]

TO-FIX
Play Button Only Plays The Sequence 6 Consecutive Times
CAUSE
- Variable Declaration Of Audio Context Inside Of Time Interval In JS
