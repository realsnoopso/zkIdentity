function Add() {
  return (
    <div className="Add">
      <div>
        <label for="voca">단어</label>
        <input type="text" id="voca" />
      </div>
      <div>
        <label for="description">설명</label>
        <input type="text" id="description" />
      </div>
      <div>
        <label for="example">예시</label>
        <input type="text" id="example" />
      </div>
      <button>추가하기</button>
    </div>
  );
}

export default Add;