# 뽀글랩 (BOGGLE LAB)

고등학생 학습용 가상 화학 실험실입니다. HTML, CSS, JavaScript만 사용합니다.

## 파일 구성
- `index.html`: 사이트 화면과 브라우저 탭 제목/아이콘 연결
- `favicon.svg`: 브라우저 탭과 사이트 이름 옆에 표시되는 뽀글랩 아이콘
- `style.css`: 디자인
- `main.js`: 화면 이동
- `experiments/neutralization.js`: 중화 반응 입자 모형
- `experiments/redox.js`: 산화·환원 실험 안내

## GitHub Pages 배포
저장소의 최상위(root)에 `index.html`, `style.css`, `main.js`, `favicon.svg`, `experiments/` 폴더를 업로드합니다. GitHub 저장소에서 Settings → Pages → Deploy from a branch → `main` / `/(root)`를 선택하고 저장합니다.

## 학습용 단순화 안내
중화 반응 모형은 입자 구분과 H⁺ + OH⁻ → H₂O의 의미를 익히기 위한 정성적·단순화된 모형입니다. 농도, 실제 해리 평형, 수산화 칼슘의 용해도는 정확히 계산하지 않습니다.


## 이번 수정본에서 확인할 점
- 중화 반응은 산·염기 용액 모두 0 mL에서 시작하며, +5 mL / +10 mL 버튼을 누르면 부피와 입자 모형이 갱신됩니다.
- 초기화 버튼은 두 용액을 0 mL로 되돌립니다.
- 산화·환원은 아연-황산구리, 알루미늄-황산구리의 가상 실험 버튼으로 용액과 금속을 단계별 추가합니다.
- 은-황산구리 비교에서는 일반적인 수용액 조건에서 반응이 일어나지 않음을 보여 줍니다.
- 입자 수는 반응식을 설명하기 위한 단순화된 모형입니다. 실제 실험의 농도나 반응 속도를 계산하는 도구는 아닙니다.

업로드할 때 ZIP 자체를 저장소에 올리지 말고, 압축을 풀어 `index.html`, `style.css`, `main.js`, `favicon.svg`, `experiments` 폴더를 저장소 최상위에 올리세요.
