"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(_a) {
    var t = _a.types;
    return {
        visitor: {
            Identifier: function (path, state) {
                if (path.node.name !== 'console')
                    return;
                if (t.isExpressionStatement(path.parentPath.parentPath.parentPath)) {
                    path.parentPath.parentPath.parentPath.remove();
                }
            },
        },
    };
}
exports.default = default_1;
