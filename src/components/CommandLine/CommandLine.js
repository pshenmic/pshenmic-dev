import { BlurFilter } from 'pixi.js';
import { Stage, Container, Sprite, Text } from '@pixi/react';
import { useMemo, useState, useCallback, useEffect, useRef } from 'react';

import './CommandLine.scss'

const CommandLine = () =>
{
  const blurFilter = useMemo(() => new BlurFilter(4), []);

  const [StageHeight, setHeight] = useState(0);
  const [StageWidth, setWidth] = useState(0);
  const StageContainer = useRef(null);

  // const StageContainer = useCallback(node => {
  //   console.log('RER');
  //   console.log(node);

  //   if (node !== null) {
  //     setHeight(node.getBoundingClientRect().height);
  //     setWidth(node.getBoundingClientRect().width);
  //   }
  // }, []);


  useEffect(() => {
    console.log('use effect1')
    console.log(StageContainer)

    if (StageContainer !== null) {
      console.log(StageContainer.current)

      console.log(StageContainer.current.getBoundingClientRect().height)

      setHeight(StageContainer.current.getBoundingClientRect().height)
      setWidth(StageContainer.current.getBoundingClientRect().width)
    }
    
  }, [StageContainer.current?.getBoundingClientRect().width]);


  return (
    <div className='CommandLine' >
      <div className='CommandLine__Title'>letscode</div>

      <div className='CommandLine__StageContainer' ref={StageContainer}>
        {/* <Stage
          interactive={'auto'}
          width={StageWidth} 
          height={StageHeight}
          className='CommandLine__Stage'
        >
          <Sprite
            image="https://pixijs.io/pixi-react/img/bunny.png"
            x={400}
            y={270}
            anchor={{ x: 0.5, y: 0.5 }}
          />

          <Container x={400} y={330}>
            <Text text="Hello World" anchor={{ x: 0.5, y: 0.5 }} filters={[blurFilter]} />
          </Container>
        </Stage> */}
      </div>
    </div>
  );
};

export default CommandLine;