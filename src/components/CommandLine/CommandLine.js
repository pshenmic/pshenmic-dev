import { useState, useEffect, React } from 'react';
import { motion as m } from 'framer-motion'
import './CommandLine.scss'


const code = {
  projects: [
    'const projects = getProjects();\n\nprojects.forEach((project) => {\nprint(project)\n});\n',
    'Hello world!',
    'Nice to meet you!\nCheck out the projects!'
  ],
  services: [
    'Let\'s spin the gears...',
    'Everything is for you!',
    'Enjoy using it!'
  ],
  team: [
    'function coding() {\n  writeCode();\n  makeYouHappy();\n}\n\n  coding();',
    'console.log("Hollo world!");'
  ],
  updates: [
    'blablalba',
    'Time to read Twitter!... Oh sorry, more precisely X!',
    'OMG! New post!'
  ],
}

const CodeText = ({category = ''}) => {
  const finalAwaitTimes = 10

  const [state, setState] = useState({
    currentText: '',
    rest: code[category][0].split(''),
    codeCategory: category,
    tik: 0,
    activeFunctionId: 0,
    awaiting: false,
    direction: true
  });

  useEffect(()=> setState( state=> ({
      ...state,
      direction: !state.currentText.length > 0,
      awaiting: false,
    }
  )), [category])

  useEffect(() => {

    let frameTime = 10
    
    if (state.awaiting) {

      frameTime = 1000

    } else if (!state.direction) {
    
      frameTime = 50
    
    } else if (state.tik % 3 === 0 || state.tik % 4 === 0) {
    
      frameTime = 300
    
    }

    setTimeout(() => {

      setState(({currentText, rest, activeFunctionId, direction, codeCategory, tik}) => {
        let line = currentText,
            newTik = tik + 1,
            newRest = rest,
            newActiveFunctionId = activeFunctionId,
            newDirection = direction,
            newCodeCategory = codeCategory
            
        if (direction) { // print text

          if (tik < rest.length) {

            line += rest[tik] !== '\n' ? rest[tik] : '<br/>'
  
          } else if (line[line.length - 1] === '_') {

              line = line.slice(0, -1)

          } else {

              line += '_'

          }

          if (tik > rest.length + finalAwaitTimes && line.length > 0 || codeCategory !== category) {
            newDirection = false
          }

        } else { // earth text
          // remove last char from string

          line = line.replaceAll('<br/>', '\n')
          line = line.substring(0, line.length - 1).replaceAll('\n', '<br/>')

          if (line.length === 0) { // setting new code function
            newDirection = true
            newTik = 0
 
            if (newCodeCategory !== category) {
              newActiveFunctionId = 0
              newCodeCategory = category
            } else {
              newActiveFunctionId = code[newCodeCategory][newActiveFunctionId + 1] !== undefined ? newActiveFunctionId + 1 : 0 
            }

            newRest = code[newCodeCategory][newActiveFunctionId] 
          }
        }

        return {
          currentText: line,
          rest: newRest,
          codeCategory: newCodeCategory,
          tik: newTik,
          activeFunctionId: newActiveFunctionId,
          awaiting: tik > rest.length && tik < rest.length + finalAwaitTimes && direction === true,
          direction: newDirection
        }

      }); // setState

    }, [frameTime]); // setInterval

  }, [state])

                     
  return <div dangerouslySetInnerHTML={{__html: state.currentText}}></div>
}

const CommandLine = ({category = 'services'}) => (
  <m.div 
    className='CommandLine' 
    initial={{ height: 0, opacity: 0 }}
    animate={{ height: 'auto', opacity: 1}}
    transition={{ duration: 0.5, delay: .5 }}
  >
    <div className='CommandLine__Title'>letscode</div>

    <div className='CommandLine__StageContainer'>
      <CodeText category={category}/>
    </div>
  </m.div>
);

export default CommandLine;