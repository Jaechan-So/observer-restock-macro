import axios, { AxiosError } from 'axios';

import { SWAGKEYS_LINK65_URL } from '../constantData';
import logger from '../log';

const KAKAO_SEND_MESSAGE_TO_ME_API_URL =
  'https://kapi.kakao.com/v2/api/talk/memo/default/send';

type KakaoMeTextMessage = {
  button_title?: string;
  link?: {
    mobile_web_url?: string;
    web_url?: string;
  };
  object_type: 'text';
  text: string;
};

export const sendMessageToMe = async (message: string) => {
  const kakaoMessage: KakaoMeTextMessage = {
    button_title: '스웨그키 바로가기',
    link: {
      mobile_web_url: SWAGKEYS_LINK65_URL,
      web_url: SWAGKEYS_LINK65_URL,
    },
    object_type: 'text',
    text: message,
  };

  try {
    await axios.post(
      KAKAO_SEND_MESSAGE_TO_ME_API_URL,
      `template_object=${JSON.stringify(kakaoMessage)}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.KAKAO_DEV_ACCESS_TOKEN}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
  } catch (err) {
    if (err instanceof AxiosError) {
      console.error(JSON.stringify(err, null, 2));
      logger.error(err);
    } else {
      logger.error('Failed to send Kakao message');
    }
  }
};
