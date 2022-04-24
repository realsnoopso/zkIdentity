import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";


// history 객체 생성
export const history = createBrowserHistory();

const rootReducer = combineReducers({
  router: connectRouter(history), // 생성된 history와 router가 연결됨
});

// middlewares
// withExtraArgument()은 argument를 추가시켜주는 매서드
const middlewares = [thunk.withExtraArgument({ history: history })];

// 지금이 어느 환경인 지 알려줘요. (개발환경, 프로덕션(배포)환경 ...)
const env = process.env.NODE_ENV;

// 개발환경에서는 로거라는 걸 하나만 더 써볼게요.
if (env === "development") {
    const { logger } = require("redux-logger");
    middlewares.push(logger);
}

// Devtools
const composeEnhancers = //window === "object" 객체가 브라우저일 때만 V8 엔진(자바스크립트 엔진)이 돌아가도록 하는 문법
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
              // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
          })
        : compose;

// reducer 엮기
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

// store 생성
let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();
