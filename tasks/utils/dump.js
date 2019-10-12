const dump = (contents) => {
    const syntaxHighlight = (json) => {
        if (typeof json != "string") {
            json = JSON.stringify(json, undefined, 2);
        }

        json = json
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

        return json.replace(
            /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
            (match) => {
                var cls = "number";
                if (/^"/.test(match)) {
                    if (/:$/.test(match)) {
                        cls = "key";
                    } else {
                        cls = "string";
                    }
                } else if (/true|false/.test(match)) {
                    cls = "boolean";
                } else if (/null/.test(match)) {
                    cls = "null";
                }

                return '<span class="' + cls + '">' + match + "</span>";
            }
        );
    }
    const uid = (~~(Math.random() * 1e8)).toString(16);
    const snippet = `
                <div class="snippet" data-id="snippet_${uid}">
                  <div class="snippet__head">
                    dump snippet
                    <button data-hide>
                      <span data-open class="show">hide</span>
                      <span data-hide class="">open</span>
                    </button>
                  </div>
                  <div class="snippet__body" data-body>
                    <pre>
                      ${syntaxHighlight(contents)} 
                    </pre>
                  </div>
                  <script>
                    const snippet_${uid} = document.querySelector('[data-id="snippet_${uid}"]');
                    const btn_${uid} = snippet_${uid}.querySelector("[data-hide]");
                    const open_${uid} = btn_${uid}.querySelector("[data-open]");
                    const hide_${uid} = btn_${uid}.querySelector("[data-hide]");
                    const body_${uid} = snippet_${uid}.querySelector("[data-body]");
                    
                    const toggleSnippet_${uid} = () => {
                      body_${uid}.classList.toggle("hidden");
                      open_${uid}.classList.toggle("show");
                      hide_${uid}.classList.toggle("show");
                    };
                    
                    btn_${uid}.addEventListener("click", toggleSnippet_${uid});
                  </script>
                  <style>
                    [data-id="snippet_${uid}"].snippet {}
                    [data-id="snippet_${uid}"] .snippet__head {
                      background-color: #fff;
                      border: 1px solid #000;
                      color: #000;
                      padding: 5px; 
                      margin: 5px; 
                    }
                    [data-id="snippet_${uid}"] .snippet__head button span {
                      display: none;
                    }
                    [data-id="snippet_${uid}"] .snippet__head button span.show {
                      display: inline-block;
                    }
                    [data-id="snippet_${uid}"] .snippet__body {
                      background-color: #000;
                      color: #fff;
                      padding: 5px; 
                      margin: 5px; 
                    }
                    [data-id="snippet_${uid}"] .snippet__body.hidden {
                      display: none;
                    }
                    [data-id="snippet_${uid}"] pre {}
                    [data-id="snippet_${uid}"] .string { color: green; }
                    [data-id="snippet_${uid}"] .number { color: darkorange; }
                    [data-id="snippet_${uid}"] .boolean { color: blue; }
                    [data-id="snippet_${uid}"] .null { color: magenta; }
                    [data-id="snippet_${uid}"] .key { color: red; }
                  </style>
                </div>
              `;
    return snippet;
};

exports.dump = dump;
