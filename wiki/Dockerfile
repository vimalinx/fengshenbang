# Canasta 3.5.21 / MediaWiki 1.43.9, pinned to the 2026-08-24 multi-arch image.
FROM ghcr.io/canastawiki/canasta@sha256:bdf4ee1a2b24f4032f910f11937d7ac5799adad285511202776bc5feade70363

# Moderation is not bundled by Canasta. Pin the extension release/commit and
# install it alongside Canasta's immutable extensions.
ARG MODERATION_COMMIT=f0d423d11eb954ed7429d7618c1868303a5a5832
ARG OATHAUTH_COMMIT=bd0ca9bd692f63bb3137d5ebdda4a2836fbb7b0a
RUN git clone https://github.com/edwardspec/mediawiki-moderation.git /tmp/Moderation \
    && git -C /tmp/Moderation checkout "$MODERATION_COMMIT" \
    && rm -rf /tmp/Moderation/.git \
    && mv /tmp/Moderation /var/www/mediawiki/w/canasta-extensions/Moderation \
    && git clone https://gerrit.wikimedia.org/r/mediawiki/extensions/OATHAuth /tmp/OATHAuth \
    && git -C /tmp/OATHAuth checkout "$OATHAUTH_COMMIT" \
    && rm -rf /tmp/OATHAuth/.git \
    && mv /tmp/OATHAuth /var/www/mediawiki/w/canasta-extensions/OATHAuth \
    && chown -R www-data:www-data \
        /var/www/mediawiki/w/canasta-extensions/Moderation \
        /var/www/mediawiki/w/canasta-extensions/OATHAuth
