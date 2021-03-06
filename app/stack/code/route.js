import Ember from 'ember';

export default Ember.Route.extend({
  model: function(/*params, transition*/) {
    var par = this.modelFor('stack');
    var stack = par.get('stack');
    return stack.doAction('exportconfig').then((config) => {
      // Windows needs CRLFs
      let templates = [];
      for ( let file in config.templates ) {
        templates.push({
          file,
          isYaml: !!(file.match(/\.ya?ml$/i)),
          contents: config.templates[file].split(/\r?\n/).join('\r\n')
        });
      }

      return Ember.Object.create({
        stack: stack,
        all: par.get('all'),
        templates: templates,
      });
    });
  },
});
