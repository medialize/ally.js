
import platform from 'platform';

// Every Environment except IE9 considers SWF objects focusable
const support = platform.name !== 'IE' || parseFloat(platform.version) >= 10;
export default support;
