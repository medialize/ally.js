
import memorizeResult from '../supports/memorize-result';
import canFocusAudioWithoutControls from '../supports/focus-audio-without-controls';
import canFocusVideoWithoutControls from '../supports/focus-video-without-controls';
import canFocusTable from '../supports/focus-table';
import canFocusFieldset from '../supports/focus-fieldset';
import canFocusSummary from '../supports/focus-summary';
import cssShadowPiercingDeepCombinator from '../supports/css-shadow-piercing-deep-combinator';

export default memorizeResult(function() {
  return {
    canFocusAudioWithoutControls: canFocusAudioWithoutControls(),
    canFocusVideoWithoutControls: canFocusVideoWithoutControls(),
    canFocusTable: canFocusTable(),
    canFocusFieldset: canFocusFieldset(),
    canFocusSummary: canFocusSummary(),
    cssShadowPiercingDeepCombinator: cssShadowPiercingDeepCombinator(),
  };
});
