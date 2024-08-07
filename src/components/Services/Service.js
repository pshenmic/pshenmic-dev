import Link from 'next/link'
import Image from 'next/image'
import { motion as m } from 'framer-motion'
import './Service.scss'

function Service ({ service, closeHandler }) {
  return (
    <m.div
      className={'Service'}
      initial={{ scale: 1.2, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.25 }}
    >
      <div className={'Service__CloseButton'} onClick={closeHandler}>
        <span>X</span>
      </div>

      {(service.imgSrc &&
        <div className={'Service__ImageContainer'}>
          <Image alt={service?.title || ''} src={service.imgSrc} width={300} height={300}/>
        </div>
      )}

      <div className={'Service__ContentContainer'}>
        <div className={'Service__Title'}>{service.title}</div>

        <div className={'Service__Description'}>{service.description}</div>

        <div className={'Service__LinksContainer'}>
          {(service.link &&
            <Link
              className={'Service__Link'}
              href={service.link}
              target={'_blank'}
            >
              <span>Go to</span>
            </Link>
          )}
        </div>
      </div>
    </m.div>
  )
}

export default Service
