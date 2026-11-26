# Serve the site locally and open it in the browser. Ctrl+C to stop.
run port="8420":
    (sleep 1 && open http://localhost:{{port}}) &
    python3 -m http.server {{port}}
