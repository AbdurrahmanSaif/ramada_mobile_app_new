import { useState, useEffect, useRef, useCallback } from 'react';
import { showMessage } from 'react-native-flash-message';
import { sendLoginOtp } from '../../actions/customer';

const useResendOTP = ({
  maxTime,
  onTimerComplete,
  timeInterval,
  onResendClick,
  phone,
  setResendLoading,
}) => {
  const timeout = useRef();
  const [remainingTime, setRemainingTime] = useState(maxTime);

  useEffect(() => {
    if (timeout.current && remainingTime === 0) {
      clearTimeout(timeout.current);
      if (onTimerComplete) {
        onTimerComplete();
      }
    } else {
      timeout.current = setTimeout(() => {
        setRemainingTime(t => t - 1);
      }, timeInterval);
    }
    return () => {
      clearTimeout(timeout.current);
    };
  }, [onTimerComplete, remainingTime, timeInterval]);

  const handelResendClick = useCallback(() => {
    setResendLoading(true);
    if (onResendClick) {
      onResendClick(remainingTime === 0);
    }

    sendLoginOtp(phone).then(result => {
      if (result.data.message) {
        showMessage({
          message: result.data.message,
          type: 'success',
          floating: true,
        });
      }
      setResendLoading(false);
      setRemainingTime(maxTime);
    });
  }, [maxTime, remainingTime, onResendClick, phone, setResendLoading]);

  return {
    handelResendClick,
    remainingTime,
  };
};

export default useResendOTP;
