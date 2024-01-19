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
    'const services = getServices();\n\nservices.forEach((service) => {\nprint(service)\n});\n',
    'Everything is for you!',
    'Enjoy using it!'
  ],
  team: [
    'function coding() {\n  writeCode();\n  makeYouHappy();\n}\n\n  coding();',
    'console.log("Hello world!");'
  ],
  updates: [
    'function checkUpdates() {\n  printUpdates();\n  readPosts();\n}\n\n  checkUpdates();',
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

    const frameTime = (() => {

      if (state.awaiting) return 1000

      if (!state.direction) return 25

      if (state.tik % 3 === 0 || state.tik % 4 === 0) return 200

      return 10

    })()

    setTimeout(() => {

      setState(({currentText, rest, activeFunctionId, direction, codeCategory, tik}) => {
        const newState = {
          currentText: currentText,
          rest: rest,
          codeCategory: codeCategory,
          tik: tik + 1,
          activeFunctionId: activeFunctionId,
          awaiting: tik > rest.length && tik < rest.length + finalAwaitTimes && direction === true,
          direction: direction
        }

        if (direction) { // print text

          newState.currentText = (() => {

            if (tik < rest.length) return newState.currentText += rest[tik] !== '\n' ? rest[tik] : '<br/>'

            if (currentText[currentText.length - 1] === '_') return newState.currentText = currentText.slice(0, -1)

            return newState.currentText += '_'

          })()

          if (tik > rest.length + finalAwaitTimes && newState.currentText.length > 0 || codeCategory !== category) { // rename category to 'activeCategory' or something like this
            newState.direction = false
          }

          return newState

        }

        // earth text

        newState.currentText = currentText.replaceAll('<br/>', '\n')
        newState.currentText = currentText.substring(0, currentText.length - 1).replaceAll('\n', '<br/>')

        if (currentText.length === 0) { // setting new code function
          newState.direction = true
          newState.tik = 0

          newState.activeFunctionId = code[category][activeFunctionId + 1] !== undefined ? activeFunctionId + 1 : 0

          if (newState.codeCategory !== category) {
            newState.activeFunctionId = 0
            newState.codeCategory = category
          }

          newState.rest = code[newState.codeCategory][newState.activeFunctionId]
        }

        return newState

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
