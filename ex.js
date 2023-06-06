// 댓글 로드
function loadComments() {
    // 로컬 스토리지에서 'comments' 키의 값을 가져옵니다. 값이 없으면 빈 배열로 초기화합니다.
    let comments = JSON.parse(localStorage.getItem('comments')) || [];
  
    let commentsContainer = document.getElementById('comments');
    commentsContainer.innerHTML = '';
  
    for (let i = 0; i < comments.length; i++) {
      let comment = comments[i];
      // 각 댓글에 대한 HTML 요소를 생성하는 함수인 createCommentElement를 호출하여 댓글 요소를 생성합니다.
      let commentElement = createCommentElement(comment, i);
      // 댓글 요소를 댓글 컨테이너에 추가합니다.
      commentsContainer.appendChild(commentElement);
    }
  }
  
  // 댓글 요소 생성
  function createCommentElement(comment, index) {
    let commentElement = document.createElement('div');
    commentElement.className = 'comment';
  
    let commentTextElement = document.createElement('p');
    commentTextElement.innerHTML = comment.commentText;
    commentElement.appendChild(commentTextElement);
  
    let editButton = document.createElement('button');
    editButton.innerHTML = '수정';
    // 수정 버튼을 클릭할 때 해당 댓글의 인덱스를 파라미터로 하여 editComment 함수를 호출합니다.
    editButton.onclick = function () {
      editComment(index);
    };
    commentElement.appendChild(editButton);
  
    let deleteButton = document.createElement('button');
    deleteButton.innerHTML = '삭제';
    // 삭제 버튼을 클릭할 때 해당 댓글의 인덱스를 파라미터로 하여 deleteComment 함수를 호출합니다.
    deleteButton.onclick = function () {
      deleteComment(index);
    };
    commentElement.appendChild(deleteButton);
  
    return commentElement;
  }
  
  // 댓글 추가
  function addComment(event) {
    event.preventDefault();
  
    let nicknameElement = document.getElementById('nickname');
    let passwordElement = document.getElementById('password');
    let commentTextElement = document.getElementById('commentText');
  
    let nickname = nicknameElement.value;
    let password = passwordElement.value;
    let commentText = commentTextElement.value;
  
    // 닉네임, 비밀번호, 댓글 내용이 모두 입력되었는지 확인합니다.
    if (nickname.trim() !== '' && password.trim() !== '' && commentText.trim() !== '') {
      let comment = {
        nickname: nickname,
        password: password,
        commentText: commentText
      };
  
      let comments = JSON.parse(localStorage.getItem('comments')) || [];
      // 새로운 댓글을 comments 배열에 추가합니다.
      comments.push(comment);
      // comments 배열을 로컬 스토리지에 저장합니다.
      localStorage.setItem('comments', JSON.stringify(comments));
      // 댓글을 추가한 후에는 loadComments 함수를 호출하여 댓글 목록을 다시 로드합니다.
      loadComments();
  
      // 입력 필드를 초기화합니다.
      nicknameElement.value = '';
      passwordElement.value = '';
      commentTextElement.value = '';
    }
  }
  
  // 댓글 수정
  function editComment(index) {
    let comments = JSON.parse(localStorage.getItem('comments')) || [];
    let comment = comments[index];
  
    // 사용자로부터 비밀번호를 입력받습니다.
    let enteredPassword = prompt('비밀번호를 입력하세요.');
    // 입력된 비밀번호와 댓글의 비밀번호를 비교하여 일치하는지 확인합니다.
    if (enteredPassword === comment.password) {
      // 수정할 새로운 댓글 내용을 입력받습니다.
      let newCommentText = prompt('댓글을 수정하세요.', comment.commentText);
  
      // 새로운 댓글 내용이 null이 아니고 공백이 아닌 경우에만 수정을 진행합니다.
      if (newCommentText !== null && newCommentText.trim() !== '') {
        // 댓글 객체의 commentText 속성을 새로운 댓글 내용으로 업데이트합니다.
        comment.commentText = newCommentText;
        // 수정된 comments 배열을 로컬 스토리지에 저장합니다.
        localStorage.setItem('comments', JSON.stringify(comments));
        // 수정이 완료되면 댓글을 다시 로드합니다.
        loadComments();
      }
    } else {
      alert('비밀번호가 일치하지 않습니다.');
    }
  }
  
  // 댓글 삭제
  function deleteComment(index) {
    let comments = JSON.parse(localStorage.getItem('comments')) || [];
    let comment = comments[index];
  
    // 사용자로부터 비밀번호를 입력받습니다.
    let enteredPassword = prompt('비밀번호를 입력하세요.');
    // 입력된 비밀번호와 댓글의 비밀번호를 비교하여 일치하는지 확인합니다.
    if (enteredPassword === comment.password) {
      // comments 배열에서 해당 댓글을 삭제합니다.
      comments.splice(index, 1);
      // 수정된 comments 배열을 로컬 스토리지에 저장합니다.
      localStorage.setItem('comments', JSON.stringify(comments));
      // 삭제가 완료되면 댓글을 다시 로드합니다.
      loadComments();
    } else {
      alert('비밀번호가 일치하지 않습니다.');
    }
  }
  
  // 페이지 로드 시 이벤트 핸들러 등록
  document.getElementById('commentForm').addEventListener('submit', addComment);
  
  // 페이지 로드 시 댓글 로드
  loadComments();
  
  