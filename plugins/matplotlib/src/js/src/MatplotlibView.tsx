import { CSSProperties, useEffect, useState } from 'react';
import type { dh } from '@deephaven/jsapi-types';
import Log from '@deephaven/log';
import { WidgetComponentProps } from '@deephaven/plugin';

const log = Log.module('@deephaven/js-plugin-matplotlib.MatplotlibView');

export const MatplotlibViewStyle: CSSProperties = {
  height: '100%',
  width: '100%',
  display: 'contents',
};

export const MatplotlibViewImageStyle: CSSProperties = {
  height: '100%',
  width: '100%',
  objectFit: 'contain',
};

/**
 * Displays a rendered matplotlib from the server
 */
export function MatplotlibView(
  props: WidgetComponentProps<dh.Widget>
): JSX.Element {
  const { fetch } = props;
  const [imageSrc, setImageSrc] = useState<string>();

  useEffect(
    function updateData() {
      async function fetchData() {
        log.debug('fetchData');
        const widget = await fetch();
        const imageData = widget.getDataAsBase64();
        console.log('Data', imageData);
        setImageSrc(`data:image/png;base64,${imageData}`);
        widget.addEventListener('message', event => {
          log.debug('Message event', event);
          console.log('Message event', event);
          const newImageData = event.detail.getDataAsBase64();
          setImageSrc(`data:image/png;base64,${newImageData}`);
        });
      }
      fetchData();
    },
    [fetch]
  );

  return (
    <div className="matplotlib-view" style={MatplotlibViewStyle}>
      {imageSrc !== undefined && (
        <img
          src={imageSrc}
          alt="Matplotlib render"
          style={MatplotlibViewImageStyle}
        />
      )}
    </div>
  );
}

export default MatplotlibView;
