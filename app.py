from flask import Flask, render_template_string, redirect, url_for

app = Flask(__name__)

# ---------------- PROFESSIONAL TEMPLATE ----------------
base = """
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{{ title }}</title>

<style>
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

body{
    font-family:Segoe UI, Arial, sans-serif;
    background:linear-gradient(135deg,#0f172a,#111827,#1e293b);
    color:white;
    min-height:100vh;
}

nav{
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:20px 50px;
    background:rgba(0,0,0,0.35);
    backdrop-filter:blur(10px);
    position:sticky;
    top:0;
}

.logo{
    font-size:28px;
    font-weight:bold;
    color:#38bdf8;
}

.nav-links a{
    color:white;
    text-decoration:none;
    margin-left:25px;
    font-weight:600;
    transition:0.3s;
}

.nav-links a:hover{
    color:#38bdf8;
}

.container{
    max-width:1200px;
    margin:auto;
    padding:60px 25px;
}

.hero{
    text-align:center;
    padding:70px 20px;
}

.hero h1{
    font-size:58px;
    margin-bottom:15px;
    color:#38bdf8;
}

.hero p{
    font-size:20px;
    opacity:0.9;
    margin-bottom:30px;
}

.btn{
    display:inline-block;
    padding:14px 28px;
    border-radius:12px;
    text-decoration:none;
    font-weight:bold;
    margin:8px;
    transition:0.3s;
}

.btn-primary{
    background:#38bdf8;
    color:black;
}

.btn-primary:hover{
    transform:translateY(-3px);
}

.btn-dark{
    background:#1e293b;
    color:white;
}

.btn-dark:hover{
    transform:translateY(-3px);
}

.grid{
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
    gap:20px;
    margin-top:40px;
}

.card{
    background:rgba(255,255,255,0.05);
    padding:28px;
    border-radius:18px;
    box-shadow:0 10px 30px rgba(0,0,0,0.3);
}

.card h2{
    color:#38bdf8;
    margin-bottom:12px;
}

.card p{
    line-height:1.6;
}

footer{
    margin-top:60px;
    text-align:center;
    padding:30px;
    background:rgba(0,0,0,0.35);
    color:#cbd5e1;
}

.link-btn{
    display:block;
    background:#38bdf8;
    color:black;
    padding:12px;
    margin-top:12px;
    border-radius:10px;
    text-decoration:none;
    font-weight:bold;
    text-align:center;
}

.link-btn:hover{
    background:#0ea5e9;
}

</style>
</head>

<body>

<nav>
    <div class="logo">SillyDev2026</div>

    <div class="nav-links">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/projects">Projects</a>
        <a href="/links">Links</a>
        <a href="/contact">Contact</a>
    </div>
</nav>

<div class="container">
{{ content|safe }}
</div>

<footer>
© 2026 SillyDev2026 | Professional Flask Website
</footer>

</body>
</html>
"""

# ---------------- ROUTES ----------------

@app.route("/")
def home():
    content = """
    <section class="hero">
        <h1>Professional Website</h1>
        <p>Modern design, clickable buttons, custom pages, and ready for deployment.</p>

        <a class="btn btn-primary" href="/projects">View Projects</a>
        <a class="btn btn-dark" href="/about">About Me</a>
    </section>

    <div class="grid">
        <div class="card">
            <h2>Modern Design</h2>
            <p>Responsive layout with clean professional styling.</p>
        </div>

        <div class="card">
            <h2>Fast Performance</h2>
            <p>Built using Python Flask for speed and simplicity.</p>
        </div>

        <div class="card">
            <h2>Ready For Domain</h2>
            <p>Can be hosted with a real link like yourname.com</p>
        </div>
    </div>
    """
    return render_template_string(base, title="Home", content=content)


@app.route("/about")
def about():
    content = """
    <div class="card">
        <h2>About Me</h2>
        <p>Hello, I'm SillyDev2026. I build games, Python systems, backends, and websites.</p>
        <p>I enjoy creating professional projects and learning advanced coding.</p>
    </div>
    """
    return render_template_string(base, title="About", content=content)


@app.route("/projects")
def projects():
    content = """
    <div class="grid">

        <div class="card">
            <h2>Clicker Game</h2>
            <p>A scalable clicker game with huge numbers.</p>
        </div>

        <div class="card">
            <h2>Secure Backend</h2>
            <p>Encrypted save systems and data tools.</p>
        </div>

        <div class="card">
            <h2>Website Systems</h2>
            <p>Modern Flask websites and dashboards.</p>
        </div>

    </div>
    """
    return render_template_string(base, title="Projects", content=content)


@app.route("/links")
def links():
    content = """
    <div class="card">
        <h2>My Links</h2>

        <a class="link-btn" href="https://github.com/SillyDev2026" target="_blank">GitHub</a>
    </div>
    """
    return render_template_string(base, title="Links", content=content)


@app.route("/contact")
def contact():
    content = """
    <div class="card">
        <h2>Contact Me</h2>
        <p>Email: your@email.com</p>
        <p>Discord: yourname</p>
        <p>Business Inquiries Open</p>
    </div>
    """
    return render_template_string(base, title="Contact", content=content)


# ---------------- DEPLOY READY ----------------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
