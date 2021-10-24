export type Action = {
  type: String,
  payload: any
}

// Action リクエスト送信前
export const GET_CAT_REQUEST = 'GET_CAT_REQUEST'

// Action レスポンス受信
export const GET_CAT_SUCCESS = 'GET_CAT_SUCCESS'

// Action エラー
export const GET_CAT_FAILURE = 'GET_CAT_FAILURE'


// Action リクエスト送信前
export const POST_PRODUCT_REQUEST = 'POST_PRODUCT_REQUEST'

// Action レスポンス受信
export const POST_PRODUCT_SUCCESS = 'POST_PRODUCT_SUCCESS'

// Action エラー
export const POST_PRODUCT_FAILURE = 'POST_PRODUCT_FAILURE'

// Action リクエスト送信前
export const GET_PRODUCT_REQUEST = 'GET_PRODUCT_REQUEST'

// Action レスポンス受信
export const GET_PRODUCT_SUCCESS = 'GET_PRODUCT_SUCCESS'

// Action エラー
export const GET_PRODUCT_FAILURE = 'GET_PRODUCT_FAILURE'
