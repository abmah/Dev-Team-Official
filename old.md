.card {
display: flex;
/_ width: 350px; _/
margin-bottom: 100px;
margin-top: 100px;
}

.card img {
width: 280px;
height: 400px;
object-fit: cover;
}

.card-info {
margin: 0 20px;
width: 200px;
color: white;
background-color: rgba(0, 0, 0, 0.5);
height: fit-content;
padding: 6px;

}

.card-left {
flex-direction: row-reverse;
}

.cards-container {
width: 90%;
max-width: 1000px;
margin: 0 auto;
}

@media screen and (max-width: 768px) {

.card {
flex-direction: column;
}

}
