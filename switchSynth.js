export default class SwitchSynth
{
    rootNote;
    subdivisions;
    offsets;
    octave;

    AudioContext;
    audioCtx;
    oscArray;
    oscillatorState;     

    constructor(rootNote,subdivisions,offsets,octave)
    {
        this.AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioCtx = new AudioContext();
        this.oscArray = [];
        this.oscillatorState = [];     
    
        this.rootNote = rootNote;
        this.subdivisions = subdivisions;
        this.offsets = offsets;
        this.octave = octave;
    }

    createOscillators()
    {
        for(var i = 0; i<16 ; i++)
        {
          let currentOsc = this.audioCtx.createOscillator();
          currentOsc.frequency.setValueAtTime (Math.pow(this.octave, (this.offsets[i]) / this.subdivisions) * this.rootNote ,this.audioCtx.currentTime);
          currentOsc.startedAlready = false;
          this.oscArray.push(currentOsc);
          this.oscillatorState.push(false);     
        }
    }

    startOscillators()
    {
        this.oscArray.forEach(osc => 
            {
              osc.start();
            }
        );
    }

    connectSpecificOscillator(indexOfOscillator)
    {
        this.oscArray[indexOfOscillator].connect(this.audioCtx.destination);
        this.oscillatorState[indexOfOscillator] = true;
    }

    disconnectSpecificOscillator(indexOfOscillator)
    {
        this.oscArray[indexOfOscillator].disconnect(this.audioCtx.destination);
        this.oscillatorState[indexOfOscillator] = false;
    }
}