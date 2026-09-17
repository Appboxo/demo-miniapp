import React from 'react'
import classnames from 'classnames'
import { SecondaryButton } from '@appboxo/ui-kit'
import { ReactComponent as SuccessIcon } from '../components/svgs/success-icon.svg'
import { ReactComponent as ErrorIcon } from '../components/svgs/error-icon.svg'

const LoginResponse = ({ isSuccessful, onTryAgain, onContinue }) => {
  return (
    <div className={classnames('pane', {
      success: isSuccessful,
      error: !isSuccessful
    })}>
      <div className="center">
        <div>
          {isSuccessful ? <SuccessIcon /> : <ErrorIcon />}
          <h3>
            {isSuccessful ? 'Successfully authorised' : 'Unsuccessful authorisation'}
          </h3>
        </div>
      </div>
      <SecondaryButton
        className="button"
        text={isSuccessful ? 'Continue' : 'Try again'}
        onClick={isSuccessful ? onContinue : onTryAgain}
      />
    </div>
  )
}

export default LoginResponse
