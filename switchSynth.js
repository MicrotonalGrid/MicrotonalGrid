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
              osc.connect(this.gainArray[this.oscArray.indexOf(osc)]).connect(this.audioCtx.destination);
              osc.start(this.audioCtx.currentTime);
              this.gainArray[this.oscArray.indexOf(osc)].gain.setValueAtTime(0, this.audioCtx.currentTime);
            }
        );
    }

    connectSpecificOscillator(indexOfOscillator)
    {
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
        this.regenerateAllFrequencies();
    }

    updateSubdivision(newValue)
    {
        this.subdivisions = newValue;
        this.regenerateAllFrequencies();        
    }

    disconnectSpecificOscillator(indexOfOscillator)
    {
        this.gainArray[indexOfOscillator].gain.setValueAtTime(0, this.audioCtx.currentTime);
        this.oscillatorState[indexOfOscillator] = false;
    }

    updateAllConfig(octave,subdivisions,offsets,rootNote=220)
    {
        this.octave = octave;
        this.subdivisions = subdivisions;
        this.offsets = offsets;
        this.rootNote = rootNote;
        this.regenerateAllFrequencies();
    }

    regenerateAllFrequencies()
    {
        for(let i = 0; i<16 ; i++)
            {
              this.oscArray[i].frequency.setValueAtTime (Math.pow(this.octave, (this.offsets[i]) / this.subdivisions) * this.rootNote ,this.audioCtx.currentTime);
            }
    }
}