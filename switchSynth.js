export default class SwitchSynth
{
    rootNote;
    subdivisions;
    offsets;
    octave;

    AudioContext;
    audioCtx;
    oscArray;
    gainArray;
    oscillatorState;     
    noteLength;
    attackRamp;
    decaySlide;
    maxVol;

    constructor(rootNote,subdivisions,offsets,octave,noteLength)
    {

        this.oscArray = [];
        this.gainArray = [];
        this.oscillatorState = [];     
    
        this.rootNote = rootNote;
        this.subdivisions = subdivisions;
        this.offsets = offsets;
        this.octave = octave;
        this.noteLength = noteLength/1000;
        this.attackRamp = this.noteLength*0.4;
        this.decaySlide = this.noteLength*0.4;
        this.maxVol = 0.8
    }

    createOscillators()
    {
        this.AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioCtx = new AudioContext();
        for(let i = 0; i<16 ; i++)
        {
          let currentOsc = this.audioCtx.createOscillator();
          //const gainNode = audioCtx.createGain(); // todo.... this stuff
          // https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Advanced_techniques#the_final_playsweep_function
          /**
           * 
           *    const sweepEnv = new GainNode(audioCtx);
                sweepEnv.gain.cancelScheduledValues(time);
                sweepEnv.gain.setValueAtTime(0, time);
                sweepEnv.gain.linearRampToValueAtTime(1, time + attackTime);
                sweepEnv.gain.linearRampToValueAtTime(0, time + sweepLength - releaseTime);

                osc.connect(sweepEnv).connect(audioCtx.destination);
                osc.start(time);
                osc.stop(time + sweepLength);
           * 
           */
          currentOsc.type = "triangle";
          currentOsc.frequency.setValueAtTime (Math.pow(this.octave, (this.offsets[i]) / this.subdivisions) * this.rootNote ,this.audioCtx.currentTime);
          currentOsc.startedAlready = false;
          this.oscArray.push(currentOsc);
          this.oscillatorState.push(false);   
          const currentGain = new GainNode(this.audioCtx);
          currentGain.gain.cancelScheduledValues(this.audioCtx.currentTime);
          currentGain.gain.setValueAtTime(0, this.audioCtx.currentTime);
          this.gainArray.push(currentGain);
        }
    }

    startOscillators()
    {
        this.oscArray.forEach(osc => 
            {
        //this.oscArray[indexOfOscillator].connect(this.audioCtx.destination);

              //osc.start();
        //osc.connect(sweepEnv).connect(audioCtx.destination);

              osc.connect(this.gainArray[this.oscArray.indexOf(osc)]).connect(this.audioCtx.destination);
              osc.start(this.audioCtx.currentTime);
              this.gainArray[this.oscArray.indexOf(osc)].gain.setValueAtTime(0, this.audioCtx.currentTime);
            }
        );
    }

    connectSpecificOscillator(indexOfOscillator)
    {
        //this.oscArray[indexOfOscillator].connect(this.audioCtx.destination);
        
        //osc.start(time);
        
        this.gainArray[indexOfOscillator].gain.setValueAtTime(0, this.audioCtx.currentTime);

        this.gainArray[indexOfOscillator].gain.linearRampToValueAtTime(this.maxVol, this.audioCtx.currentTime + this.attackRamp);
        this.gainArray[indexOfOscillator].gain.linearRampToValueAtTime(0, this.audioCtx.currentTime + this.noteLength - this.decaySlide);

        this.oscillatorState[indexOfOscillator] = true;
    }

    updateSpecificOscillator(oscIndex,offsetValue)
    {
        this.offsets[oscIndex] = offsetValue;
        this.oscArray[oscIndex].frequency.setValueAtTime (Math.pow(this.octave, offsetValue / this.subdivisions) * this.rootNote ,this.audioCtx.currentTime);
    }

    updateOctave(newValue)
    {
        this.octave = newValue;
        console.log("update octave new value : " + newValue);

        this.regenerateAllFrequencies();
    }

    updateSubdivision(newValue)
    {
        this.subdivisions = newValue;
        console.log("update subdivision new value : " + newValue);
        this.regenerateAllFrequencies();
        
    }

    disconnectSpecificOscillator(indexOfOscillator)
    {
        //this.oscArray[indexOfOscillator].disconnect(this.audioCtx.destination);
        this.gainArray[indexOfOscillator].gain.setValueAtTime(0, this.audioCtx.currentTime);
        //this.oscArray[indexOfOscillator].osc.stop(this.audioCtx.currentTime);
        this.oscillatorState[indexOfOscillator] = false;
    }

    updateAllConfig(octave,subdivisions,offsets,rootNote=220)
    {
        this.octave = octave;
        this.subdivisions = subdivisions;
        this.offsets = offsets;
        this.rootNote = rootNote;
        this.regenerateAllFrequencies();
 
        console.log("this.octave"); 
        console.log(this.octave); 
            console.log("this.subdivisions"); 
            console.log(this.subdivisions); 
                console.log("this.offsets"); 
                console.log(this.offsets); 
                    console.log("this.rootNote");
                    console.log(this.rootNote);

    }

    regenerateAllFrequencies()
    {
        for(let i = 0; i<16 ; i++)
            {
              this.oscArray[i].frequency.setValueAtTime (Math.pow(this.octave, (this.offsets[i]) / this.subdivisions) * this.rootNote ,this.audioCtx.currentTime);
            }
    }
}