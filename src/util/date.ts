import dayjs from 'dayjs';
import ObjectSupport from 'dayjs/plugin/objectSupport';
import toObject from 'dayjs/plugin/toObject';

/**
 * Plugins
 * @see https://day.js.org/docs/en/plugin/plugin
 */
dayjs.extend(ObjectSupport);
dayjs.extend(toObject);

export default dayjs;